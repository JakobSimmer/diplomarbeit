import mariadb from 'mariadb'

let pool: any = null;

type MeasurementType = "vakuum" | "wasserdampf" | "druckluft" | "strom";
const validMeasurementTypes = ['wasserdampf', 'vakuum', 'strom', 'druckluft']

const DB = {

    initPool(): void {
        console.log('DB: ' + process.env.DB_IP);
        pool = mariadb.createPool({
            host: process.env.DB_IP,
            user: 'root',
            password: 'RZp7z1FNp3atzHth',
            database: 'sensor',
            port: 3306,
            multipleStatements: true,
        });
    },

    getConnection(): Promise<mariadb.PoolConnection> {
        return pool.getConnection()
    },
    query(query: string, values?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then((conn) => {
                    conn.query(query, values)
                        .then((res) => {
                            conn.end()
                            resolve(res)
                        })
                        .catch((err) => {
                            conn.end()
                            reject(err)
                        })
                })
                .catch((err) => reject(err))
        })
    },

    async getLastMeasurementsFromType(type: MeasurementType, num: number) {
        let query = "";
        query += "SELECT M.value, M.timestamp, M.sensor_id_fk FROM tbl_measurement AS M "
        query += "INNER JOIN tbl_measurement_type AS MT "
        query += "ON M.measurement_type_id_fk = MT.id AND MT.name = ? "
        query += " ORDER BY M.id DESC "
        query += " LIMIT ?"

        try {
            const result = await this.query(query, [type, num]);
            return result;
        } catch(err) {
            console.log('Database error: ');
            console.log(err);
            throw err;
        }
    },

    async updateCost(type: MeasurementType, cost: number) {
        let query = "";
        query += "UPDATE tbl_measurement_type ";
        query += "SET cost_per_unit = ? ";
        query += "WHERE name = ? ";
        

        try {
            const result = await this.query(query, [cost, type]);
            return result;
        } catch(err) {
            console.log('Database error: ');
            console.log(err);
            throw err;
        }
    },

    async getCost(type: MeasurementType) {
        let query = "";
        query += "SELECT cost_per_unit FROM tbl_measurement_type ";
        query += "WHERE name = ? ";
        

        try {
            const result = await this.query(query, [type]);
            return result[0].cost_per_unit;
        } catch(err) {
            console.log('Database error: ');
            console.log(err);
            throw err;
        }
    },

    async insertMeasurement(sensorId: BigInt, value: number, type: MeasurementType) {
        let query = "";
        query += "INSERT INTO tbl_measurement ";
        query += "VALUES (NULL, ?, ?, (SELECT id FROM tbl_measurement_type WHERE name = ?), NOW())";

        try {
            await this.query(query, [sensorId, value, type]);
            return true;
        } catch(err) {
            console.log(err)
            return false;
        }
    }
    
}

export { DB, MeasurementType, validMeasurementTypes };

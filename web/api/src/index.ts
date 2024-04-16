import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import {DB} from './database/database'
import dataRouter from './routes/data'
import costRouter from './routes/cost'
import 'dotenv/config'

const app = express()
const port = 3001;

app.use(bodyParser.json())

DB.initPool();

app.use('/', express.static('../app'))

app.use('/api/data', dataRouter);
app.use('/api/cost', costRouter);

app.use('/api/test', (req, res) => {
    res.send('working');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404)
    if (req.accepts('json')) {
        res.json({ status: 'error', msg: 'URLnotFound' })
        return
    }
    res.type('txt').send('Not found')
})

app.listen(port, () => {
    console.log('API running on port: ' + port)
})

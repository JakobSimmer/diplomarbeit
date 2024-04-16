import express, { Request, Response, NextFunction } from 'express'
import { DB, MeasurementType } from '../database/database'


const validMeasurementTypes = ['wasserdampf', 'vakuum', 'strom', 'druckluft']

const router = express.Router()

router.get('/:type', async (req: Request, res: Response) => {
    const measurementType = req.params.type

    for (const t of validMeasurementTypes) {
        if (t === measurementType) {
            try {
                const result = await DB.getLastMeasurementsFromType(
                    t as MeasurementType,
                    10
                )
                res.json(result)
                return
            } catch (err) {
                res.status(500).json({
                    status: 'error',
                    message: err,
                });
                return;
            }
        }
    }

    res.status(400).json({
        status: 'error',
        message: 'invalid measurement type',
    })
})


export default router

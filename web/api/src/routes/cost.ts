import express, { Request, Response, NextFunction } from 'express'
import {
    DB,
    MeasurementType,
    validMeasurementTypes,
} from '../database/database'

const router = express.Router()

router.get('/:type', async (req: Request, res: Response) => {
    const measurementType = req.params.type
    for (const t of validMeasurementTypes) {
        if (t === measurementType) {
            try {
                const cost = await DB.getCost(measurementType as MeasurementType)
                return res.json({ cost: cost })
            } catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: err,
                })
            }
        }
    }   

    res.status(400).json({
        status: 'error',
        message: 'invalid measurement type',
    })
})

router.put('/', async (req: Request, res: Response) => {
    const measurementType = req.body.type
    const newCost = req.body.cost

    for (const t of validMeasurementTypes) {
        if (t === measurementType) {
            try {
                await DB.updateCost(measurementType, newCost)
            } catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: err,
                })
            }
        }
    }

    res.status(400).json({
        status: 'error',
        message: 'invalid measurement type',
    })
})

export default router

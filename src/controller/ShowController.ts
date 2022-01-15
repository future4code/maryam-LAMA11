import { Request, Response } from "express";
import ShowBusiness from "../business/ShowBusiness";
import ShowDatabase from "../data/ShowDatabase";

export default class ShowController {
    async create (req: Request, res: Response): Promise<void> {
        try {
            const {weekDay, startTime, endTime, groupId} = req.body
            const token = req.headers.authorization as string

            await new ShowBusiness().create(weekDay, startTime, endTime, groupId, token)

            res.status(200).send({message: 'Show Criado.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async getAll (req: Request, res: Response): Promise <void> {
        try {
            const weekDay = req.params.day

            const shows = await new ShowBusiness().getAll(weekDay, new ShowDatabase().getAll)

            res.status(200).send(shows)
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}
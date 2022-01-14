import { Request, Response } from "express";
import ShowBusiness from "../business/ShowBusiness";

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
}
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

    async createTicket (req: Request, res: Response): Promise <void> {
        try {
            const {name, price, quantity, showId} = req.body
            const token = req.headers.authorization as string

            await new ShowBusiness().createTicket(name, price, quantity, showId, token)

            res.status(200).send({message: 'Ingresso Criado.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async createPhoto (req: Request, res: Response): Promise<void> {
        try {
            const { url } = req.body
            const showId = req.params.showId
            const token = req.headers.authorization as string

            await new ShowBusiness().createPhoto(url, showId, token)

            res.status(200).send({message: 'Foto postada.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async getPhotos (req: Request, res: Response): Promise <void> {
        try {
            const showId = req.params.showId

            const photos = await new ShowBusiness().getPhotos(showId)

            res.status(200).send(photos)
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}
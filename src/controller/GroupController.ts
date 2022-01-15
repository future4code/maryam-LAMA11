import { Request, Response } from "express";
import GroupBusiness from "../business/GroupBusiness";
import GroupDatabase from "../data/GroupDatabase";
import { Group } from "../model/Group";

export default class GroupController {
    async create (req: Request, res: Response): Promise<void> {
        try {
            const {name, musicGenre, responsible} = req.body
            const token = req.headers.authorization as string

            await new GroupBusiness().create(name, musicGenre, responsible, token)
            
            res.status(200).send({message: 'Banda Criada.'})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async getById (req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id

            const group = await new GroupBusiness().getById(id, new GroupDatabase().checkById)

            res.status(200).send(group)
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
    
}
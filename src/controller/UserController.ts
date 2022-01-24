import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import UserDatabase from "../data/UserDatabase";

export default class UserController {
    async signup (req: Request, res: Response): Promise<void> {
        try {
            const {name, email, password, role} = req.body
            
            const token = await new UserBusiness().signup(name, email, password, new UserDatabase().checkUsers, new UserDatabase().signup, role)

            res.status(200).send({message: 'Usuário criado!', token: token})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async login (req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body
            
            const token = await new UserBusiness().login(email, password, new UserDatabase().checkUsers)

            res.status(200).send({token: token})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async buyTicket (req: Request, res: Response): Promise <void> {
        try {
            const { quantity } = req.body
            const token = req.headers.authorization as string
            const ticketId = req.params.ticketId
            console.log(quantity)

            await new UserBusiness().buyTicket(quantity, token, ticketId)

            res.status(200).send({message: "Compra efetuada."})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}
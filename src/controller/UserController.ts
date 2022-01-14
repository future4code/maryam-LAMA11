import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";

export default class UserController {
    async signup (req: Request, res: Response): Promise<void> {
        try {
            const {name, email, password, role} = req.body
            
            const token = await new UserBusiness().signup(name, email, password, role)

            res.status(200).send({message: 'Usuário criado!', token: token})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }

    async login (req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body
            
            const token = await new UserBusiness().login(email, password)

            res.status(200).send({token: token})
        } catch (error: any) {
            res.status(500).send(error.message || error.sqlmessage)
        }
    }
}
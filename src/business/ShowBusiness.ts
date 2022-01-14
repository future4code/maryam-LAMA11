import GroupDatabase from "../data/GroupDatabase"
import ShowDatabase from "../data/ShowDatabase"
import { Show } from "../model/Show"
import { ROLE } from "../model/User"
import { Authenticator } from "../services/authenticator"
import IdGenerator from "../services/idGenerator"

export default class ShowBusiness {
    async create (weekDay: string, startTime: number, endTime: number, groupId: string, token: string): Promise<void> {
        if (!weekDay || !startTime || !endTime || !groupId){
            throw new Error ('Informe pelo body todas as informações necessárias (weekDay, startTime, endTime e groupId).')
        }

        if (startTime % 1 !== 0  || endTime % 1 !== 0){
            throw new Error ('Os horários de início e fim precisam ser números inteiros.')
        }

        const group = await new GroupDatabase().checkById(groupId)
        if(!group){
            throw new Error ('Banda não encontrada!')
        }

        if (!token){
            throw new Error ('Envie o token no campo authorization do headers.')
        }

        const tokenData = new Authenticator().getTokenData(token)
        if (!tokenData){
            throw new Error ('Token Inválido.')
        }

        if (tokenData.role !== ROLE.ADMIN){
            throw new Error ('Você não possui autorização para realizar esta ação.')
        }

        const checkTime = await new ShowDatabase().checkTime(weekDay, startTime, endTime)
        if (checkTime){
            throw new Error ('Um show ja está marcado para este horário.')
        }

        const id = new IdGenerator().generateId()

        const newShow = new Show(id, weekDay, startTime, endTime, groupId)

        await new ShowDatabase().create(newShow)
    }
}
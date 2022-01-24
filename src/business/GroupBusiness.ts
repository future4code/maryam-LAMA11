import GroupDatabase from "../data/GroupDatabase"
import { Group } from "../model/Group"
import { ROLE } from "../model/User"
import { Authenticator } from "../services/authenticator"
import IdGenerator from "../services/idGenerator"

export default class GroupBusiness {
    async create (
        name: string, 
        musicGenre: string, 
        responsible: string, 
        token: string): Promise<void> {
        if (!name || !musicGenre || !responsible){
            throw new Error ('Envie todas as informações necessárias no body da requisição (name, musicGenre e responsible).')
        }

        if (!token){
            throw new Error ('Envie o token de autorizaçao no authorization do headers.')
        }

        const tokenData = new Authenticator().getTokenData(token)
        if (!tokenData){
            throw new Error ('Token inválido.')
        }

        if (tokenData.role !== ROLE.ADMIN){
            throw new Error ('Você não possui autorização para realizar esta operação!')
        }

        const groupDB = new GroupDatabase()
        const checkByName = await groupDB.checkByName(name)

        if (checkByName){
            throw new Error ('Banda já cadastrada.')
        }

        const id = new IdGenerator().generateId()

        const newGroup = new Group(id, name, musicGenre, responsible)

        await groupDB.create(newGroup)
    }

    async getById (
        id: string,
        getGroup:  (id: string) => Promise<Group | undefined>): Promise <Group> {
        if (!id){
            throw new Error ('Envie a ID como path params.')
        }

        const group = await getGroup(id)

        if (!group){
            throw new Error ('Banda não encontrada!')
        }

        return group
    }
}
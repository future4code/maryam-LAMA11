import GroupDatabase from "../data/GroupDatabase"
import ShowDatabase from "../data/ShowDatabase"
import { Photo, Show, Ticket } from "../model/Show"
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

    async getAll (weekDay: string, getShows: (weekDay: string) => Promise<Show []> ): Promise <Show []> {
        if (!weekDay){
            throw new Error ('Informe o dia dos shows.')
        }

        const shows = getShows(weekDay)
    
        return shows
    }

    async createTicket (name: string, price: number, quantity: number, showId: string, token: string): Promise <void> {
        if (!name || !price || !quantity || !showId){
            throw new Error ('Informe os campos obrigatórios (name, price, quantity e showId).')
        }

        if (!token){
            throw new Error ('Envie o token de autorização pelo campo authorization do headers.')
        }

        const tokenData = new Authenticator().getTokenData(token)
        if (!tokenData){
            throw new Error ('Token Inválido.')
        }

        if (tokenData.role !== ROLE.ADMIN){
            throw new Error ('Sem autorização para realizar a operação.')
        }

        if (price <= 0){
            throw new Error ('Informe um valor válido para o preço.')
        }

        if (quantity % 1 !== 0){
            throw new Error ('Informe um valor válido para a quantidade.')
        }

        const id = new IdGenerator().generateId()

        const newTicket = new Ticket(id, name, price, quantity, showId)

        await new ShowDatabase().createTicket(newTicket)
    }

    async createPhoto (url: string, showId: string, token: string): Promise<void> {
        if (!url){
            throw new Error('Informe a url da foto no body.')
        }

        if (!showId){
            throw new Error ('Informe o ID do show como path param.')
        }

        if (!token){
            throw new Error ('Envie o token de autenticação pelo campo authorization do headers.')
        }

        const tokenData = new Authenticator().getTokenData(token)
        if(!tokenData){
            throw new Error ('Token inválido!')
        }

        if (tokenData.role !== ROLE.ADMIN){
            throw new Error ('Sem autorização para realizar a operação.')
        }

        const id = new IdGenerator().generateId()

        const newPhoto = new Photo(id, url, showId)

        await new ShowDatabase().createPhoto(newPhoto)
    }

    async getPhotos (showId: string): Promise <Photo []> {
        if (!showId){
            throw new Error ('Informe a ID do show.')
        }

        const photos = await new ShowDatabase().getPhotos(showId)

        return photos
    }
}
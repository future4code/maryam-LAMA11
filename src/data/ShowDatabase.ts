import { Photo, Show, Ticket } from "../model/Show";
import connection from "./connection";

export default class ShowDatabase {
    async checkTime (weekDay: string, startTime: number, endTime: number): Promise<boolean> {
        const end = endTime - 1
        const start = startTime + 1
        console.log(start, end)
        const shows = await connection ('lama_shows')
            .where({
                week_day: weekDay
            })
            .whereBetween('start_time', [startTime, end])
            .orWhereBetween('end_time', [start, endTime])
            .select('*')

        if (shows.length > 0){
            return true
        } else {
            return false
        }
    }

    async create (show: Show) {
        await connection ('lama_shows')
            .insert({
                id: show.getId(),
                week_day: show.getWeekDay(),
                start_time: show.getStartTime(),
                end_time: show.getEndTime(),
                band_id: show.getGroupId()
            })
    }

    async getAll (weekDay: string): Promise <Show []> {
        const shows = await connection ('lama_shows')
            .where({week_day: weekDay})
            .orderBy('start_time')
        
        const allShows: Show [] = []

        for (let show of shows){
            const newShow = new Show(show.id, show.week_day, show.start_time, show.end_time, show.band_id)

            allShows.push(newShow)
        }

        return allShows
    }

    async createTicket (ticket: Ticket): Promise <void> {
        await connection ('lama_tickets')
            .insert({
                id: ticket.getId(),
                name: ticket.getName(),
                price: ticket.getPrice(),
                quantity: ticket.getQuantity(),
                show_id: ticket.getShowId()
            })
    }

    async getTicketById (ticketId: string): Promise <any [] | undefined> {
        const ticket = await connection ('lama_tickets')
            .where({id: ticketId})
            .select('*')
        
        if (ticket.length > 0){
            return ticket

        } else {
            return undefined
        }
    }

    async createPhoto (photo: Photo): Promise<void> {
        await connection ('lama_photos')
            .insert({
                id: photo.getId(),
                url: photo.getUrl(),
                show_id: photo.getShowId()
            })
    }

    async getPhotos (showId: string): Promise <Photo []> {
        const photos = await connection ('lama_photos')
            .where({show_id: showId})
            .select('*')
        
        const photosList: Photo [] = []

        for (let photo of photos){
            const newPhoto =  new Photo(photo.id, photo.url, photo.show_id)

            photosList.push(newPhoto)
        }

        return photosList
    }
}
import { Show } from "../model/Show";
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
}
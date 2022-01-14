import { Group } from "../model/Group";
import connection from "./connection";

export default class GroupDatabase {
    async checkByName (name: string): Promise<Group | undefined> {
        const group = await connection ('lama_group')
            .where({name})
            .select('*')
        
        if (group.length > 0){
            const newGroup = new Group(group[0].id, group[0].name, group[0].music_genre, group[0].responsible)

            return newGroup
        } else {
            return undefined
        }
    }

    async checkById (id: string): Promise<Group | undefined> {
        const group = await connection ('lama_group')
            .where({id})
            .select('*')
        
        if (group.length > 0){
            const newGroup = new Group(group[0].id, group[0].name, group[0].music_genre, group[0].responsible)

            return newGroup
        } else {
            return undefined
        }
    }

    async create (group: Group){
        await connection ('lama_group')
            .insert({
                id: group.getId(),
                name: group.getName(),
                music_genre: group.getMusicGenre(),
                responsible: group.getResponsible()
            })
    }
}
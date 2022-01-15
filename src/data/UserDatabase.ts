import { User } from "../model/User";
import connection from "./connection";

export default class UserDatabase {
    async signup (user: User): Promise <void>{
        await connection ('lama_users')
            .insert({
                id: user.getId(),
                name: user.getName(),
                password: user.getPassword(),
                email: user.getEmail(),
                role: user.getRole()
            })
    }

    async checkUsers (email: string): Promise<User | undefined> {
        const user = await connection ('lama_users')
            .where({email})
            .select('*')
        
        if (user.length > 0){
            const newUser = new User(user[0].id, user[0].email, user[0].name, user[0].password, user[0].role)

            return newUser
        } else {
            return undefined
        }
    }
}
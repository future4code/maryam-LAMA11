import { ROLE, User } from "../model/User"
import { Authenticator } from "../services/authenticator"
import { HashManager } from "../services/hashManager"
import IdGenerator from "../services/idGenerator"


export default class UserBusiness {
    async signup (
        name: string, 
        email: string, 
        password: string, 
        checkEmail: (email: string) => Promise <User | undefined>,
        register: (user: User) => Promise <void>,
        role?: string): Promise<string> {
        if (!name || !email || !password){
            throw new Error ('Preencha os campos obrigatórios (name, email e password).')
        }

        let userRole: ROLE
        if (role !== 'ADMIN'){
            userRole = ROLE.NORMAL
        } else {
            userRole = ROLE.ADMIN
        }

        const checkUser = await checkEmail(email)
        if (checkUser){
            throw new Error ('Email já cadastrado!')
        }

        const id = new IdGenerator().generateId()

        const hashPassword = new HashManager().createHash(password)

        const newUser = new User(id, email, name, hashPassword, userRole)

        await register(newUser)

        const token = new Authenticator().generateToken({id: newUser.getId(), role: newUser.getRole()})

        return token
    }

    async login (
        email: string, 
        password: string,
        checkEmail: (email: string) => Promise <User | undefined>): Promise<string> {
        if (!email || !password){
            throw new Error ('Preencha os campos obrigatórios (email e password)')
        }

        const user = await checkEmail(email)
        if (!user){
            throw new Error ('Email ou senha incorretos.')
        }

        const passwordIsCorrect = new HashManager().compareHash(password, user.getPassword())
        if (!passwordIsCorrect){
            throw new Error ('Email ou senha incorretos.')
        }

        const token = new Authenticator().generateToken({id: user.getId(), role: user.getRole()})

        return token
    }
}
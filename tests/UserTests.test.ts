import UserBusiness from "../src/business/UserBusiness"
import { ROLE, User } from "../src/model/User"
import { HashManager } from "../src/services/hashManager"

describe ('Test Login', () => {
    test('Login - Caso Sucesso', async () => {
        async function returnUser (email: string): Promise < User | undefined > {
            if (true){
                const password = new HashManager().createHash('123456')
                return new User('12dedjne4283', 'acb@email.com', 'abc', password, ROLE.NORMAL)
            } else{
                return undefined
            }
        }

        expect(await new UserBusiness().login('abc@email.com', '123456', returnUser)).not.toBe('Preencha os campos obrigatórios (email e password)')
        expect(await new UserBusiness().login('abc@email.com', '123456', returnUser)).not.toBe('Email ou senha incorretos.')
        expect(await new UserBusiness().login('abc@email.com', '123456', returnUser)).not.toBe(undefined)
        
    })

    test('Login - Campos não preenchidos', async () => {
        async function returnUser (email: string): Promise < User | undefined > {
            if (true){
                const password = new HashManager().createHash('123456')
                return new User('12dedjne4283', 'acb@email.com', 'abc', password, ROLE.NORMAL)
            } else{
                return undefined
            }
        }

        
        try {
            await new UserBusiness().login('', '123456', returnUser)
        } catch (error: any) {
            expect(error.message).toBe('Preencha os campos obrigatórios (email e password)')
        } finally {
            expect.assertions(1)
        }
        
    })

    test('Login - senha incorreta', async () => {
        async function returnUser (email: string): Promise < User | undefined > {
            if (true){
                const password = new HashManager().createHash('123456')
                return new User('12dedjne4283', 'acb@email.com', 'abc', password, ROLE.NORMAL)
            } else{
                return undefined
            }
        }
         
        try {
            await new UserBusiness().login('abc@email.com', '1234567', returnUser)
        } catch (error: any) {
            expect(error.message).toBe('Email ou senha incorretos.')
        } finally {
            expect.assertions(1)
        }
        
    })
})

describe ('Test Signup', () => {
    test('Caso Sucesso', async () => {
        async function returnUser (email: string): Promise < User | undefined > {
            if (false){
                const password = new HashManager().createHash('123456')
                return new User('12dedjne4283', 'acb@email.com', 'abc', password, ROLE.NORMAL)
            } else{
                return undefined
            }
        }

        async function registerMock (user: User): Promise <void> {
            
        }

        expect(await new UserBusiness().signup('abc', 'abc@email.com', '123456', returnUser, registerMock, ROLE.NORMAL)).not.toBe('Preencha os campos obrigatórios (name, email e password).')
        expect(await new UserBusiness().signup('abc', 'abc@email.com', '123456', returnUser, registerMock, ROLE.NORMAL)).not.toBe('Email já cadastrado!')
        expect(await new UserBusiness().signup('abc', 'abc@email.com', '123456', returnUser, registerMock, ROLE.NORMAL)).not.toBe(undefined)
    })

    test('Campos Preenchidos', async () => {
        async function returnUser (email: string): Promise < User | undefined > {
            if (false){
                const password = new HashManager().createHash('123456')
                return new User('12dedjne4283', 'acb@email.com', 'abc', password, ROLE.NORMAL)
            } else{
                return undefined
            }
        }

        async function registerMock (user: User): Promise <void> {
            
        }

        try {
            await new UserBusiness().signup('abc', '', '123456', returnUser, registerMock, ROLE.NORMAL)
        } catch (error: any) {
            expect(error.message).toBe('Preencha os campos obrigatórios (name, email e password).')
        } finally {
            expect.assertions(1)
        }
    })

    test('Email já cadastrad0', async () => {
        async function returnUser (email: string): Promise < User | undefined > {
            if (true){
                const password = new HashManager().createHash('123456')
                return new User('12dedjne4283', 'acb@email.com', 'abc', password, ROLE.NORMAL)
            } else{
                return undefined
            }
        }

        async function registerMock (user: User): Promise <void> {
            
        }

        try {
            await new UserBusiness().signup('abc', 'abc@email.com', '123456', returnUser, registerMock, ROLE.NORMAL)
        } catch (error: any) {
            expect(error.message).toBe('Email já cadastrado!')
        } finally {
            expect.assertions(1)
        }
    })
})
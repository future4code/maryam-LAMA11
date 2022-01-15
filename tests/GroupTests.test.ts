import GroupBusiness from "../src/business/GroupBusiness"
import { Group } from "../src/model/Group"

describe('Group Tests', () => {
    test('Caso Sucesso', async () => {
        async function getByIdMock (id: string): Promise<Group | undefined> {
            if (true){
                return new Group('23234dsdsq', 'Banda X', "Rock", 'abc')
            } else {
                return undefined
            }
        }

        try {
            expect(await new GroupBusiness().getById('23234dsdsq', getByIdMock)).toEqual({"id": "23234dsdsq", "musicGenre": "Rock", "name": "Banda X", "responsible": "abc"})
            expect(await new GroupBusiness().getById('23234dsdsq', getByIdMock)).not.toBe('Envie a ID como path params.')
            expect(await new GroupBusiness().getById('23234dsdsq', getByIdMock)).not.toBe('Banda não encontrada!')
        } catch (error: any) {
            console.log(error.message)
        } finally {
            expect.assertions(3)
        }
    })

    test('ID não enviada', async () => {
        async function getByIdMock (id: string): Promise<Group | undefined> {
            if (true){
                return new Group('23234dsdsq', 'Banda X', "Rock", 'abc')
            } else {
                return undefined
            }
        }

        try {
            await new GroupBusiness().getById('', getByIdMock)
        } catch (error: any) {
            expect(error.message).toBe('Envie a ID como path params.')
        } finally {
            expect.assertions(1)
        }
    })

    test('Banda não encontrada', async () => {
        async function getByIdMock (id: string): Promise<Group | undefined> {
            if (false){
                return new Group('23234dsdsq', 'Banda X', "Rock", 'abc')
            } else {
                return undefined
            }
        }

        try {
            await new GroupBusiness().getById('23234dsdsq', getByIdMock)
        } catch (error: any) {
            expect(error.message).toBe('Banda não encontrada!')
        } finally {
            expect.assertions(1)
        }
    })
})
import ShowBusiness from "../src/business/ShowBusiness"
import { Show } from "../src/model/Show"

describe('Show Tests', () => {
    test('Caso Sucesso', async () => {
        async function getAllMock (weekDay: string): Promise <Show []> {
            const show = new Show('12undw438293', 'saturday', 20, 23, 'Banda X')

            const shows = [show]

            return shows
        }

        try {
            expect(await new ShowBusiness().getAll('saturday', getAllMock)).toEqual([{'id': '12undw438293', 'weekDay': 'saturday', 'startTime': 20, 'endTime': 23, 'groupId': 'Banda X'}])
        } catch (error: any) {
            console.log(error.message)
        } finally {
            expect.assertions(1)
        }
    })

    test('Dia não informado', async () => {
        async function getAllMock (weekDay: string): Promise <Show []> {
            const show = new Show('12undw438293', 'saturday', 20, 23, 'Banda X')

            const shows = [show]

            return shows
        }

        try {
            await new ShowBusiness().getAll('', getAllMock)
        } catch (error: any) {
            expect(error.message).toBe('Informe o dia dos shows.')
        } finally {
            expect.assertions(1)
        }
    })
})
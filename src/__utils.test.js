import * as Utils from './__utils'

describe("time related functions' tests ", () => {
    it('timestamp should return a time stamp of a datetime string ', () => {
        const timestamp = Utils.timestamp('28/09/2020, 15:59:11')
        expect(timestamp).toEqual(1601301551)
    })
})

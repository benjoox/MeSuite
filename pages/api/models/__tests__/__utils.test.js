import { splitArray } from '../__utils'

describe('Split an array', () => {
    it('should create an array of arrays', () => {
        const testArray = [
            'a',
            'dd',
            'fff',
            'gggg',
            'rrrrr',
            'dddddd',
            'hhhhhhh',
            'nnnnnnnn',
            'sss',
        ]
        const result = splitArray(testArray, 2)
        expect(result).toEqual([
            ['a', 'dd'],
            ['fff', 'gggg'],
            ['rrrrr', 'dddddd'],
            ['hhhhhhh', 'nnnnnnnn'],
            ['sss'],
        ])
    })
})

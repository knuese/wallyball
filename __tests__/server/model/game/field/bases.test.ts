import { Bases } from '../../../../../src/server/model'

describe('bases', () => {
  describe('toBinaryStr', () => {
    it.each([
      [false, false, false, '000'],
      [false, false, true, '001'],
      [false, true, false, '010'],
      [false, true, true, '011'],
      [true, false, false, '100'],
      [true, false, true, '101'],
      [true, true, false, '110'],
      [true, true, true, '111']
    ])(
      'converts (third: %s, second: %s, first: %s) to binary',
      (third, second, first, expected) => {
        const bases = new Bases({ first, second, third })
        expect(bases.toBinaryStr()).toEqual(expected)
      }
    )
  })

  describe('strToMap', () => {
    it.each(['a11', '01', '1111'])('throws an error for %s', (str) => {
      expect(() => Bases.strToMap(str)).toThrow('invalid base string provided')
    })

    it.each([
      ['000', { first: false, second: false, third: false }],
      ['001', { first: true, second: false, third: false }],
      ['010', { first: false, second: true, third: false }],
      ['011', { first: true, second: true, third: false }],
      ['100', { first: false, second: false, third: true }],
      ['101', { first: true, second: false, third: true }],
      ['110', { first: false, second: true, third: true }],
      ['111', { first: true, second: true, third: true }],
    ])('converts %s to a base map', (str, expected) => {
      expect(Bases.strToMap(str)).toEqual(expected)
    })
  })

  describe('clear', () => {
    it('clears the bases', () => {
      const bases = new Bases({
        first: true,
        second: true,
        third: true
      })

      bases.clear()
      expect(bases.toBinaryStr()).toEqual('000')
    })
  })
})

import { statToStr } from '../../src/util'

describe('formatters', () => {
  describe('statToStr', () => {
    it.each([
      [0, '2B', ''],
      [1, '3B', '3B, '],
      [2, 'HR', '2 HR, ']
    ])('formats a stat line - %s %s', (count, str, expected) => {
      expect(statToStr(count, str)).toEqual(expected)
    })
  })
})

import { BattingStats } from '../../../../../src/model'

describe('batting stats', () => {
  it('initializes everything to 0', () => {
    const stats = new BattingStats()
    expect(Object.values(stats).every((s) => s === 0)).toBe(true)
  })
})

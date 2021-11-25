import {
  BattingConfig,
  Outcome,
  PitchingConfig,
  Player,
  Position
} from '../../../../src/server/model'

describe('player', () => {
  const stats = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1]
  const player = new Player(
    'Wally',
    [Position.THIRD_BASE, Position.PITCHER],
    new BattingConfig(stats),
    new PitchingConfig(stats)
  )

  it.each([
    [true, 'can', Position.THIRD_BASE],
    [false, 'cannot', Position.SHORTSTOP]
  ])('returns %s if a player %s a position', (expected, _desc, position) => {
    expect(player.canPlay(position)).toEqual(expected)
  })

  it('can bat', () => {
    expect(player.bat()).not.toEqual(Outcome.UNKNOWN)
  })

  it('can pitch', () => {
    expect(player.pitch()).not.toEqual(Outcome.UNKNOWN)
  })

  it('throws an error if the player cannot pitch', () => {
    const nonPitcher = new Player(
      'Bo Bo',
      [Position.FIRST_BASE],
      new BattingConfig(stats)
    )
    expect(() => nonPitcher.pitch()).toThrow(Error('Bo Bo is not a pitcher'))
  })
})

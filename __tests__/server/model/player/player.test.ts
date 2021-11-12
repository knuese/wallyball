import {
  BattingStats,
  Outcome,
  PitchingStats,
  Player,
  Position
} from '../../../../src/server/model'

describe('player', () => {
  const player = new Player(
    'Wally',
    [Position.THIRD_BASE, Position.PITCHER],
    new BattingStats({ single: 1 } as any),
    new PitchingStats({ strikeout: 1 } as any)
  )

  it.each([
    [true, 'can', Position.THIRD_BASE],
    [false, 'cannot', Position.SHORTSTOP]
  ])('returns %s if a player %s a position', (expected, _desc, position) => {
    expect(player.canPlay(position)).toEqual(expected)
  })

  it('can bat', () => {
    expect(player.bat()).toEqual(Outcome.SINGLE)
  })

  it('can pitch', () => {
    expect(player.pitch()).toEqual(Outcome.STRIKEOUT)
  })

  it('throws an error if the player cannot pitch', () => {
    const nonPitcher = new Player('Bo Bo', [Position.FIRST_BASE], {} as any)
    expect(() => nonPitcher.pitch()).toThrow(Error('Bo Bo is not a pitcher'))
  })
})

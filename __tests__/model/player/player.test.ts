import {
  BattingConfig,
  Outcome,
  PitchingConfig,
  Player,
  Position
} from '../../../src/model'

describe('player', () => {
  const batting = { thresholds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1] }
  const pitching = { thresholds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1] }

  const player = new Player({
    name: 'Wally',
    positions: [Position.THIRD_BASE, Position.PITCHER],
    batting,
    pitching
  })

  it.each([
    [true, 'can', Position.THIRD_BASE],
    [false, 'cannot', Position.SHORTSTOP]
  ])('returns %s if a player %s a position', (expected, _desc, position) => {
    expect(player.canPlay(position)).toEqual(expected)
  })

  it('can bat', () => {
    expect(player.bat()).not.toEqual(Outcome.UNKNOWN)
  })

  it('logs an at bat and gets the stat line', () => {
    player.logAtBat(Outcome.DOUBLE, 0)
    expect(player.getBattingStatLine()).toEqual('1 - 1, 2B')
  })

  it('can pitch', () => {
    expect(player.pitch()).not.toEqual(Outcome.UNKNOWN)
  })

  it('throws an error if the player cannot pitch', () => {
    const nonPitcher = new Player({
      name: 'Bo Bo',
      positions: [Position.FIRST_BASE],
      batting
    })
    expect(() => nonPitcher.pitch()).toThrow(Error('Bo Bo is not a pitcher'))
  })
})

import { Bases, Outcome } from '../../../../../src/server/model'

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
      ['111', { first: true, second: true, third: true }]
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

  describe('advanceRunners', () => {
    describe('single', () => {
      it('puts a runner on first', () => {
        const bases = new Bases()
        const { runsScored, outs } = bases.advanceRunners(Outcome.SINGLE, 0)
        expect(bases.toBinaryStr()).toEqual('001')
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(0)
      })

      it('advances a runner that is on base', () => {
        const bases = new Bases(Bases.strToMap('010'))
        const { runsScored, outs } = bases.advanceRunners(Outcome.SINGLE, 0)
        expect(bases.toBinaryStr()).toEqual('101')
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(0)
      })

      it('scores a run if someone is on third', () => {
        const bases = new Bases(Bases.strToMap('100'))
        const { runsScored, outs } = bases.advanceRunners(Outcome.SINGLE, 0)
        expect(bases.toBinaryStr()).toEqual('001')
        expect(runsScored).toEqual(1)
        expect(outs).toEqual(0)
      })
    })

    describe('double', () => {
      it('puts a runner on second', () => {
        const bases = new Bases()
        const { runsScored, outs } = bases.advanceRunners(Outcome.DOUBLE, 0)
        expect(bases.toBinaryStr()).toEqual('010')
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(0)
      })

      it('advances a runner that is on base', () => {
        const bases = new Bases(Bases.strToMap('001'))
        const { runsScored, outs } = bases.advanceRunners(Outcome.DOUBLE, 0)
        expect(bases.toBinaryStr()).toEqual('110')
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(0)
      })

      it.each([
        [1, true, false],
        [2, true, true]
      ])(
        'scores %s runs for runners (second: %s, third: %s)',
        (runs, second, third) => {
          const bases = new Bases({ first: false, second, third })
          const { runsScored, outs } = bases.advanceRunners(Outcome.DOUBLE, 0)
          expect(bases.toBinaryStr()).toEqual('010')
          expect(runsScored).toEqual(runs)
          expect(outs).toEqual(0)
        }
      )
    })

    describe('triple', () => {
      it('puts a runner on third', () => {
        const bases = new Bases()
        const { runsScored, outs } = bases.advanceRunners(Outcome.TRIPLE, 0)
        expect(bases.toBinaryStr()).toEqual('100')
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(0)
      })

      it.each([
        [1, '001'],
        [2, '011'],
        [3, '111']
      ])('scores %s runs for base string %s', (runs, baseStr) => {
        const bases = new Bases(Bases.strToMap(baseStr))
        const { runsScored, outs } = bases.advanceRunners(Outcome.TRIPLE, 0)
        expect(bases.toBinaryStr()).toEqual('100')
        expect(runsScored).toEqual(runs)
        expect(outs).toEqual(0)
      })
    })

    describe('home run', () => {
      it.each([
        [1, '000'],
        [2, '100'],
        [3, '011'],
        [4, '111']
      ])('scores %s runs for base string %s', (runs, baseStr) => {
        const bases = new Bases(Bases.strToMap(baseStr))
        const { runsScored, outs } = bases.advanceRunners(Outcome.HOME_RUN, 0)
        expect(bases.toBinaryStr()).toEqual('000')
        expect(runsScored).toEqual(runs)
        expect(outs).toEqual(0)
      })
    })

    describe('walk', () => {
      it('puts a runner on first', () => {
        const bases = new Bases()
        const { runsScored, outs } = bases.advanceRunners(Outcome.WALK, 0)
        expect(bases.toBinaryStr()).toEqual('001')
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(0)
      })

      it('scores if the bases are loaded', () => {
        const bases = new Bases(Bases.strToMap('111'))
        const { runsScored, outs } = bases.advanceRunners(Outcome.WALK, 0)
        expect(bases.toBinaryStr()).toEqual('111')
        expect(runsScored).toEqual(1)
        expect(outs).toEqual(0)
      })

      it.each([
        ['001', '011'],
        ['010', '011'],
        ['011', '111'],
        ['100', '101'],
        ['101', '111'],
        ['110', '111']
      ])('determines the runners for bases %s', (baseStr, expected) => {
        const bases = new Bases(Bases.strToMap(baseStr))
        const { runsScored, outs } = bases.advanceRunners(Outcome.WALK, 0)
        expect(bases.toBinaryStr()).toEqual(expected)
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(0)
      })
    })

    describe('grounder', () => {
      it('returns an out if there are already two outs', () => {
        const bases = new Bases(Bases.strToMap('111'))
        const { runsScored, outs } = bases.advanceRunners(Outcome.GROUNDER, 2)
        expect(runsScored).toEqual(0)
        expect(outs).toEqual(1)
      })

      it('uses the GrounderUtil if there are less than two outs', () => {
        const bases = new Bases(Bases.strToMap('101'))
        const { runsScored, outs } = bases.advanceRunners(Outcome.GROUNDER, 0)
        expect(bases.toBinaryStr()).toEqual('000')
        expect(runsScored).toEqual(1)
        expect(outs).toEqual(2)
      })
    })
  })
})

import { Player, Runner } from '../src/server/model'

export const batter = { id: 'batter' } as Player
export const first = { id: 'first' } as Runner
export const second = { id: 'second' } as Runner
export const third = { id: 'third' } as Runner

export const bases = {
  '000': { first: null, second: null, third: null },
  '001': { first, second: null, third: null },
  '010': { first: null, second, third: null },
  '011': { first, second, third: null },
  '100': { first: null, second: null, third },
  '101': { first, second: null, third },
  '110': { first: null, second, third },
  '111': { first, second, third }
}

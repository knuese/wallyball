import { Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

import aquatiques from './aquatiques'
import bears from './bears'
import birds from './birds'
import cats from './cats'
import dinoz from './dinoz'
import dogs from './dogs'
import monkeys from './monkeys'
import seals from './seals'
import turtles from './turtles'
import ugs from './ugs'

export const getTeams = (stats: Record<string, PlayerStats>): Team[] => [
  aquatiques(stats),
  bears(stats),
  birds(stats),
  cats(stats),
  dinoz(stats),
  dogs(stats),
  monkeys(stats),
  seals(stats),
  turtles(stats),
  ugs(stats)
]

import { Team } from '../../model'
import { PlayerStats } from '../../store/types/stats'

import bears from './bears'
import birds from './birds'
import cats from './cats'
import dogs from './dogs'
import seals from './seals'
import turtles from './turtles'

export const getTeams = (stats: Record<string, PlayerStats>): Team[] => [
  bears(stats),
  birds(stats),
  cats(stats),
  dogs(stats),
  seals(stats),
  turtles(stats)
]

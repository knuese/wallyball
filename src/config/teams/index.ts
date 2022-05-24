import { Team } from '../../model'

import bears from './bears'
import birds from './birds'
import cats from './cats'
import dogs from './dogs'
import seals from './seals'
import turtles from './turtles'

export const getTeams = (): Team[] => [bears, birds, cats, dogs, seals, turtles]

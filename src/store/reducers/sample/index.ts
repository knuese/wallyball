// import { tempBamboos } from './bamboo'
// import { tempBjs } from './bj'
import { tempBears } from './bears'
import { tempBirds } from './birds'
import { tempCats } from './cats'
import { tempDogs } from './dogs'
import { tempSeals } from './seals'
import { tempTurtles } from './turtles'

export const randomTeams = () => {
  const teams = [
    tempBears,
    tempTurtles,
    tempCats,
    tempDogs,
    tempBirds,
    tempSeals
  ]
  return {
    away: teams.splice(Math.floor(Math.random() * teams.length), 1)[0],
    home: teams.splice(Math.floor(Math.random() * teams.length), 1)[0]
  }
}

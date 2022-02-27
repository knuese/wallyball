import game from './game'
import { away, home } from './team'

export default {
  game,
  teams: {
    away: { team: away },
    home: { team: home }
  }
}

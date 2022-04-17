import { Outcome } from '../model'

export const isHit = (outcome: Outcome): boolean =>
  [Outcome.SINGLE, Outcome.DOUBLE, Outcome.TRIPLE, Outcome.HOME_RUN].includes(
    outcome
  )

export const isAtBat = (outcome: Outcome): boolean =>
  ![Outcome.WALK, Outcome.HIT_BY_PITCH].includes(outcome)

export const isOut = (outcome: Outcome): boolean =>
  [Outcome.FLY, Outcome.GROUNDER, Outcome.STRIKEOUT].includes(outcome)

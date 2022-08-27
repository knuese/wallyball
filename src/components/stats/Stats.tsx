import { useState } from 'react'
import classNames from 'classnames'
import { IndividualTable, TeamTable } from '.'

export const Stats = () => {
  const [showIndividual, setShowIndividual] = useState(true)

  return (
    <div className='stats'>
      <h1>Stats</h1>
      <div className="flex-row center stat-types">
        <a
          className={classNames({ 'selected': showIndividual })}
          onClick={() => setShowIndividual(true)}
        >
          Individual
        </a>
        <a
          className={classNames({ 'selected': !showIndividual })}
          onClick={() => setShowIndividual(false)}
        >
          Team
        </a>
      </div>
      <div className='stats-table-container'>
        {showIndividual ? <IndividualTable /> : <TeamTable />}
      </div>
    </div>
  )
}

export default Stats

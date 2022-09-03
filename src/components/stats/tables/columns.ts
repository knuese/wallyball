export type Column = {
  header: string
  accessor: string
  sortDescFirst?: boolean
}

export const getStandingsColumns = (): Column[] => [
  { header: 'Team', accessor: 'name' },
  { header: 'W', accessor: 'wins', sortDescFirst: true },
  { header: 'L', accessor: 'losses', sortDescFirst: true },
  { header: 'GB', accessor: 'gamesBack', sortDescFirst: true },
  { header: 'PCT', accessor: 'winPercentage', sortDescFirst: true }
]

export const getIndividualColumns = (): Column[] => [
  { header: '', accessor: 'name' },
  { header: 'Tm', accessor: 'team' },
  { header: 'G', accessor: 'games', sortDescFirst: true },
  { header: 'PA', accessor: 'plateAppearances', sortDescFirst: true },
  { header: 'AB', accessor: 'atBats', sortDescFirst: true },
  { header: 'R', accessor: 'runs', sortDescFirst: true },
  { header: 'H', accessor: 'hits', sortDescFirst: true },
  { header: '2B', accessor: 'doubles', sortDescFirst: true },
  { header: '3B', accessor: 'triples', sortDescFirst: true },
  { header: 'HR', accessor: 'homeRuns', sortDescFirst: true },
  { header: 'RBI', accessor: 'rbis', sortDescFirst: true },
  { header: 'BB', accessor: 'walks', sortDescFirst: true },
  { header: 'SO', accessor: 'strikeouts', sortDescFirst: true },
  { header: 'AVG', accessor: 'avg', sortDescFirst: true },
  { header: 'OBP', accessor: 'obp', sortDescFirst: true },
  { header: 'SLG', accessor: 'slg', sortDescFirst: true },
  { header: 'OPS', accessor: 'ops', sortDescFirst: true }
]

const getColumns = () => [
  { header: '', accessor: 'name' },
  { header: 'Tm', accessor: 'team' },
  { header: 'G', accessor: 'games' },
  { header: 'PA', accessor: 'plateAppearances' },
  { header: 'AB', accessor: 'atBats' },
  { header: 'R', accessor: 'runs' },
  { header: 'H', accessor: 'hits' },
  { header: '2B', accessor: 'doubles' },
  { header: '3B', accessor: 'triples' },
  { header: 'HR', accessor: 'homeRuns' },
  { header: 'RBI', accessor: 'rbis' },
  { header: 'BB', accessor: 'walks' },
  { header: 'SO', accessor: 'strikeouts' },
  { header: 'AVG', accessor: 'avg' },
  { header: 'OBP', accessor: 'obp' },
  { header: 'SLG', accessor: 'slg' },
  { header: 'OPS', accessor: 'ops' }
]

export default getColumns

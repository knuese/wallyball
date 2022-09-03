import { FC, useMemo } from 'react'
import BaseTable from './BaseTable'
import { getStandingsColumns } from './columns'

export const StandingsTable: FC = () => {
  const columns = useMemo(() => getStandingsColumns(), []) as any

  return <BaseTable columns={columns} data={[]} />
}

export default StandingsTable

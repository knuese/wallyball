import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { BaseTable } from '../../../../src/components/stats/tables'

describe('<BaseTable />', () => {
  const col1 = { header: 'Column 1', accessor: 'col1' }
  const col2 = { header: 'Column 2', accessor: 'col2' }
  const datum1 = { col1: 'foo', col2: 'bar' }
  const datum2 = { col1: 'baz', col2: 'buz' }

  it('renders a table with data', () => {
    const { getByText } = render(
      <BaseTable columns={[col1, col2]} data={[datum1, datum2]} />
    )

    expect(getByText(col1.header)).toBeInTheDocument()
    expect(getByText(col2.header)).toBeInTheDocument()
    expect(getByText(datum1.col1)).toBeInTheDocument()
    expect(getByText(datum1.col2)).toBeInTheDocument()
    expect(getByText(datum2.col1)).toBeInTheDocument()
    expect(getByText(datum2.col2)).toBeInTheDocument()
  })

  it('sorts a column', () => {
    const { queryByText } = render(
      <BaseTable columns={[col1, col2]} data={[datum1, datum2]} />
    )

    const header = queryByText(col1.header) as Element

    // ascending first
    fireEvent.click(header)
    expect(queryByText(/▲/)).toBeInTheDocument()

    // then descending
    fireEvent.click(header)
    expect(queryByText(/▼/)).toBeInTheDocument()
  })
})

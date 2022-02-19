import { Header } from '.'

export const withHeader: (ui: JSX.Element) => JSX.Element = (
  ui: JSX.Element
) => (
  <>
    <Header />
    <div className="flex-row center">{ui}</div>
  </>
)

export default withHeader

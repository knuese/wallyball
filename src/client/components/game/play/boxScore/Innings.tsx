import { FC } from 'react'
import { useTeam } from '../../../../hooks'
import { Side } from '../../../../store/types/team'

export const Innings: FC = () => {
  const away = useTeam(Side.AWAY)
  const home = useTeam(Side.HOME)

  return (
    <table className="innings-table">
      <thead>
        <th></th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>R</th>
        <th>H</th>
        <th>E</th>
      </thead>
      <tbody>
        <tr>
          <td
            className="border-right"
            style={{
              color: '#DEB887', // away.secondaryColor,
              backgroundColor: '#841B2D', // away.primaryColor
              borderRight: '2px solid black'
            }}
          >
            <b>Bears</b>
          </td>
          <td>0</td>
          <td>0</td>
          <td>1</td>
          <td>0</td>
          <td>0</td>
          <td>1</td>
          <td>0</td>
          <td>0</td>
          <td style={{ borderRight: '2px solid black' }}>0</td>
          <td>2</td>
          <td>5</td>
          <td>0</td>
        </tr>
        <tr>
          <td
            style={{
              color: '#A7FC00', // home.secondaryColor,
              backgroundColor: '#007F5C', // home.primaryColor
              borderRight: '2px solid black'
            }}
          >
            <b>Turtles</b>
          </td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>2</td>
          <td>0</td>
          <td>0</td>
          <td>1</td>
          <td style={{ borderRight: '2px solid black' }}>X</td>
          <td>3</td>
          <td>8</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Innings

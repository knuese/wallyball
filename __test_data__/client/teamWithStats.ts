export const bearsWithStats = {
  name: 'Bears',
  color: '#DEB887',
  background: '#841B2D',
  scores: [0, 0, 1, 0, 0, 1, 0, 0, 0],
  runs: 2,
  hits: 5,
  errors: 0,
  batting: [
    ['Sammy', 4, 0, 0, 0, 0, 0],
    ['Buster', 3, 1, 1, 0, 1, 1],
    ['Tush', 4, 0, 2, 1, 0, 2],
    ['Bo Bo', 4, 0, 0, 0, 0, 2],
    ['Spanky', 4, 0, 1, 0, 0, 2],
    ['Sparey', 4, 1, 1, 1, 0, 0],
    ['Cappy', 3, 0, 0, 0, 0, 1],
    ['Cupcake', 3, 0, 0, 0, 0, 1],
    ['September', 3, 0, 0, 0, 0, 1]
  ],
  battingExtra: {
    doubles: ['Buster'],
    homeRuns: ['Sparey']
  },
  pitching: [['September', '8.0', 8, 3, 2, 2, 9]]
}

export const turtlesWithStats = {
  name: 'Turtles',
  color: '#A7FC00',
  background: '#007F5C',
  scores: [0, 0, 0, 2, 0, 1, 0, 0, 0],
  runs: 3,
  hits: 8,
  errors: 1,
  batting: [
    ['Zoona', 4, 1, 2, 0, 0, 0],
    ['Chan', 3, 0, 1, 1, 1, 1],
    ['Guss', 4, 0, 0, 0, 0, 2],
    ['Browny', 3, 0, 0, 0, 1, 3],
    ['Shells', 4, 1, 1, 1, 0, 1],
    ['Glen', 4, 0, 2, 0, 0, 0],
    ['Cookie', 4, 1, 0, 0, 0, 1],
    ['George', 3, 0, 1, 0, 0, 1],
    ['Gary', 3, 0, 1, 0, 0, 0]
  ],
  battingExtra: {
    doubles: ['Chan', 'Glen'],
    triples: ['Zoona']
  },
  pitching: [
    ['Gary', '8.0', 4, 2, 2, 1, 8],
    ['Shells', '1.0', 1, 0, 0, 0, 2]
  ]
}

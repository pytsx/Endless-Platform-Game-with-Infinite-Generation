const ENV = {
  collidable: {
    empty: {
      key: 0,
      color: 'rgba(20, 10, 100, .3)'
    },
    platform_inside: {
      key: 1,
      color: 'rgba(50, 150,50, 0.5)'
    },
    platform_border: {
      key: 2,
      color: 'rgba(50, 150,50, 0.5)'
    },
    world_border: {
      key: 3,
      color: 'rgba(155, 155, 155, 0.5)'
    },
    first_chunk: {
      key: 4,
      color: 'rgba(0, 0, 0, 0.5)'
    },
    second_chunk: {
      key: 5,
      color: 'rgba(255, 255, 255, 0.5)'
    },
    coins: {
      key: 6,
      color: 'rgba(245,205,39, 1)'
    },
    null: {
      key: 100,
      color: 'rgba(0,0,0,0)'
    },
    explosion: {
      key: -1,
      color: 'rgba(0,0,0,0)'
    }
  },
}

let DEBUG = false

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  r: {
    pressed: false
  },
  p: {
    pressed: false
  },
  o: {
    pressed: false
  }
}

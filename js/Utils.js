function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}

function objCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}



function handleKeyup(e) {
  const { key } = e

  switch (key) {
    case 'a':
      keys.a.pressed = false
      break;
    case 'd':
      keys.d.pressed = false
      break;
    case 'r':
      keys.r.pressed = false
      break
    case 'p':
      keys.p.pressed = false
      break
    case 'o':
      keys.o.pressed = false
      break
  }
}

function handleKeydown(e) {
  const { key } = e
  switch (key) {
    case 'a':
      keys.a.pressed = true
      break;
    case 'd':
      keys.d.pressed = true
      break;
    case 'w':

      if (countJump < jumpLimit - 1) {
        player.velocity.y = -8
        player.position.y -= 8

        keys.w.pressed = true
      } else if (countJump < jumpLimit) {
        player.velocity.y = -10
        player.position.y -= 10

        keys.w.pressed = true
      }
      countJump++
      keys.w.pressed = true
      break;
    case 'r':
      keys.r.pressed = true
      break
    case 'p':
      keys.p.pressed = true
      break
    case 'o':
      keys.o.pressed = true
      break
  }
}

function getRandomNumber(min, max) {

  const range = max - min
  const random = Math.random()
  const randomNumber = random * range + min

  return Math.round(randomNumber)
}

function collidableBlocksFilter(symbol) {
  let {
    platform_border,
    platform_inside,
    world_border,
    coins,
    potion
  } = ENV.collidable

  return (
    (
      symbol == platform_border.key ||
      symbol == platform_inside.key ||
      symbol == world_border.key ||
      symbol == coins.key ||
      symbol == potion.key
    ) ||
    DEBUG
  )
}
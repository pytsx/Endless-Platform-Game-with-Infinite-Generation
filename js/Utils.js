function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <= object2.position.y + object2.height &&
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
  }
}

function getRandomNumber(min, max) {

  const range = max - min

  const random = Math.random()

  const randomNumber = random * range + min

  return Math.round(randomNumber)
}

function sliceMatriz(matriz) {
  let halfIndex = getRandomNumber(2, matriz.length)
  let firstHalf = matriz.slice(0, halfIndex)
  let secondHalf = matriz.slice(halfIndex)
  return {
    firstHalf,
    secondHalf
  }
}

function mountHalfMatriz(half) {
  let yNovaEntidade = getRandomNumber(0, half.length > 1 ? half.length - 1 : half.length)
  let xNovaEntidade = getRandomNumber(2, 32 - 4)
  // console.log('gerado: ', yNovaEntidade, ' limite: ', half.length - 1);

  if (yNovaEntidade < half.length) {
    half[yNovaEntidade][xNovaEntidade] = 2
    half[yNovaEntidade][xNovaEntidade + 1] = 1
    half[yNovaEntidade][xNovaEntidade + 2] = 1
    half[yNovaEntidade][xNovaEntidade + 3] = 2
  } else mountHalfMatriz(half)
  return half
}

function insertBlock(matriz) {
  let { firstHalf, secondHalf } = sliceMatriz(matriz)

  firstHalf = mountHalfMatriz(firstHalf)
  secondHalf = mountHalfMatriz(secondHalf)

  let mountMatriz = [...firstHalf, ...secondHalf]
  return mountMatriz;
}
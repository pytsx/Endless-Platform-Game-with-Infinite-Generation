const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const camera = {
  position: {
    x: 0,
    y: 0
  }
}


const wizard_ia = new GameEntity(
  {
    position: {
      x: 150,
      y: 250
    },
    imageSrc: './Sprites/Idle.png',
    frameRate: 8,
    frameBuffer: 15,
    velocity: {
      x: 0,
      y: 1
    },
    collisionMap
  }
)

class Coin extends GameObject {
  constructor({ position, id }) {
    super({
      id,
      position,
      env: ENV.collidable.coins,
      sprite: {
        imageSrc: './Sprites/coin.png',
        frameBuffer: 16,
        frameRate: 7,
        scale: .2,
        animations: {
          Coin: {
            imageSrc: './Sprites/coin.png',
            frameBuffer: 16,
            frameRate: 7,
            scale: .2
          },
        }
      },
    })
  }
}

const coin = new Coin({
  id: 159,
  position: {
    x: 50,
    y: 200
  },
})



const jumpLimit = 2
let countJump = 0

let player = wizard

const coins = [coin]
function animate() {
  window.requestAnimationFrame(animate)

  // desenha canvas 
  c.fillStyle = '#3d3d3d'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()

  c.translate(0, camera.position.y)

  coin.update()

  wizard_ia.update()
  wizard_ia.checkForCanvasCollision({ canvas })

  player.collisionMap.update()
  player.update()
  player.checkForCanvasCollision({ canvas })

  player.checkForCoinCollision({ coins })

  c.restore()

  player.velocity.x = 0

  if (keys.a.pressed) {
    player.velocity.x = -3
    player.switchSprite('MoveLeft')
    player.lastDirection.push('left')
  } else if (keys.d.pressed) {
    player.velocity.x = 3
    player.switchSprite('Move')
    player.lastDirection.push('right')
  } else if (player.velocity.y == 0 && player.velocity.x == 0) {
    if (player.lastDirection[player.lastDirection.length - 1] === 'right') player.switchSprite('Idle')
    else player.switchSprite('IdleLeft')
  } else if (keys.o.pressed) {
    player.debug = true
    DEBUG = true
  } else if (keys.p.pressed) {
    player.debug = false
    DEBUG = false
  }

  if (player.velocity.y == 0) {
    countJump = 0
  } else if (player.velocity.y < 0) {
    player.shouldWorldExpand()
    player.shouldPanCameraDown({ canvas, camera })

  } else if (player.velocity.y > 0 || keys.r.pressed) {
    player.shouldPanCameraUp({ canvas, camera })
    // player.gameover({ camera, force: keys.r.pressed })
  }

}

animate()

window.addEventListener('keydown', handleKeydown)
window.addEventListener('keyup', handleKeyup)




const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  }
}

const camera = {
  position: {
    x: 0,
    y: 0
  }
}

const jumpLimit = 2
let countJump = 0

const collisionMap = new CollisionMap()

collisionMap.genereteChunk()

const player = new Player(
  {
    position: {
      x: 50,
      y: 200
    },
    imageSrc: './Sprites/Idle.png',
    frameRate: 8,
    frameBuffer: 15,
    collisionMap,
    animations: {
      Idle: {
        imageSrc: './Sprites/Idle.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      IdleLeft: {
        imageSrc: './Sprites/IdleLeft.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      Death: {
        imageSrc: './Sprites/Death.png',
        frameRate: 8,
        frameBuffer: 25,
      },
      Move: {
        imageSrc: './Sprites/Move.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      MoveLeft: {
        imageSrc: './Sprites/MoveLeft.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      Attack: {
        imageSrc: './Sprites/Attack.png',
        frameRate: 8,
        frameBuffer: 15,
      },

      Hit: {
        imageSrc: './Sprites/Take Hit.png',
        frameRate: 4,
        frameBuffer: 25,
      }
    }
  }
)

// const background = new Sprite()
function animate() {
  window.requestAnimationFrame(animate)

  // desenha canvas 

  c.fillStyle = '#3d3d3d'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()

  c.translate(0, camera.position.y)

  collisionMap.update()

  player.update()
  player.checkForCanvasCollision({ canvas })

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
  }

  if (player.velocity.y == 0) {
    countJump = 0
  } else if (player.velocity.y < 0) {
    player.shouldWorldExpand()
    player.shouldPanCameraDown({ canvas, camera })
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ canvas, camera })
  }

}

animate()

window.addEventListener('keydown', handleKeydown)
window.addEventListener('keyup', handleKeyup)




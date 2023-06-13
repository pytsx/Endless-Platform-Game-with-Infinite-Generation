const gameEngine = new GameEngine({
  player: wizard,
})

const canvas = gameEngine.canvas
const c = gameEngine.c
const camera = gameEngine.camera
const player = gameEngine.player

const jumpLimit = 2
let countJump = 0

function animate() {
  window.requestAnimationFrame(animate)

  gameEngine.update()

  if (player.velocity.y == 0) {
    countJump = 0
  } else if (player.velocity.y < 0) {
    player.shouldWorldExpand()
    player.shouldPanCameraDown({ canvas, camera })
  } else if (player.velocity.y > 0 || keys.r.pressed) {
    player.shouldPanCameraUp({ canvas, camera })
    player.gameover({ camera, force: keys.r.pressed })
  }

}

animate()

window.addEventListener('keydown', handleKeydown)
window.addEventListener('keyup', handleKeyup)
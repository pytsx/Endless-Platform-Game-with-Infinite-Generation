class GameEngine {
  constructor({ player }) {
    this.player = player
    this.camera = {
      position: {
        x: 0,
        y: 0
      }

    }
    this.objs = [
      new Coin({
        id: 159,
        position: {
          x: 50,
          y: 200
        },
      }),
      new Potion({
        id: 160,
        position: {
          x: 150,
          y: 200
        },
      })
    ]

    this.canvas = document.querySelector('canvas')
    this.c = this.canvas.getContext('2d')
    this.canvas.width = 1024
    this.canvas.height = 576
  }

  update() {
    // console.log(player.score);

    this.c.fillStyle = '#3d3d3daf'
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height)


    this.c.save()

    this.c.translate(0, this.camera.position.y)

    this.player.update()
    this.player.checkForCanvasCollision({ canvas: this.canvas })

    this.objs.forEach(obj => {
      obj.update()
    })

    this.player.checkForGameObjectCollision({ objs: this.objs })

    this.c.restore()


    this.c.fillStyle = '#000000'
    this.c.font = ' 24px Arial'
    this.c.fillText(`score: ${this.player.score}`, 40, 25)
    this.player.velocity.x = 0


    if (keys.a.pressed) {
      this.player.velocity.x = -3
      this.player.switchSprite('MoveLeft')
      this.player.lastDirection.push('left')
    } else if (keys.d.pressed) {
      this.player.velocity.x = 3
      this.player.switchSprite('Move')
      this.player.lastDirection.push('right')
    } else if (this.player.velocity.y == 0 && this.player.velocity.x == 0) {
      if (this.player.lastDirection[this.player.lastDirection.length - 1] === 'right') this.player.switchSprite('Idle')
      else this.player.switchSprite('IdleLeft')
    } else if (keys.o.pressed) {
      this.player.debug = true
      DEBUG = true
    } else if (keys.p.pressed) {
      this.player.debug = false
      DEBUG = false
    }
  }
}
class GameEntity extends Sprite {
  constructor(
    {
      position,
      imageSrc,
      frameRate,
      frameBuffer,
      scale = 1.5,
      animations,

      velocity,
      collidableBlocks,
      collisionMap
    }
  ) {
    super({
      position,
      imageSrc,
      frameRate,
      frameBuffer,
      scale,
      animations
    })

    this.velocity = velocity

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 32,
      height: 32
    }

    this.gravity = .12

    this.debug = DEBUG

    this.collisionMap = collisionMap
    this.collidableBlocks = this.collisionMap.collidableBlocks

    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y - 200
      },
      width: 500,
      height: 400
    }
  }


  update() {
    if (this.debug) {
      //desenha regiçao do hitbox
      c.fillStyle = 'rgba(155, 0,0,0.2)'
      c.fillRect(
        this.hitbox.position.x,
        this.hitbox.position.y,
        this.hitbox.width,
        this.hitbox.height
      )
      // desenha região da imagem
      c.fillStyle = 'rgba(0, 155,0,0.1)'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    this.updateFrames()
    this.updateHitbox()

    this.position.x += this.velocity.x
    this.draw()
    this.updateCamerabox()

    this.updateHitbox()
    this.checkForHorizontalCollision()
    this.applyGravity()
    this.updateHitbox()
    this.checkForVerticalCollision()
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 130,
        y: this.position.y - 150
      },
      width: 500,
      height: 400
    }
  }


  checkForVerticalCollision() {
    let delay = 100
    for (let i = 0; i < this.collidableBlocks.length; i++) {
      const collidableBlock = this.collidableBlocks[i]
      if (
        (collidableBlock.symbol == 1
          || collidableBlock.symbol == 2
          || collidableBlock.symbol == 3
        )
        && collision({
          object1: this.hitbox,
          object2: collidableBlock
        })) {
        // quando estiver caindo
        if (this.velocity.y > 0) {
          if (collidableBlock.symbol == 1) {
            setTimeout(() => {
              collidableBlock.symbol = 100
            }, delay)
          } else if (collidableBlock.symbol == 2) {
            setTimeout(() => {
              collidableBlock.symbol = 1
            }, delay)
          }
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collidableBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }



  checkForHorizontalCollision() {
    for (let i = 0; i < this.collidableBlocks.length; i++) {
      const collidableBlock = this.collidableBlocks[i]

      if (
        (
          collidableBlock.symbol == 3
        ) &&
        collision({
          object1: this.hitbox,
          object2: collidableBlock
        })
      ) {

        if (this.velocity.x > 0) {
          this.velocity.x = 0
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collidableBlock.position.x - offset - 0.01
          break
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0
          const offset = this.hitbox.position.x - this.position.x
          this.position.x = collidableBlock.position.x + collidableBlock.width - offset + 0.01
          break
        }
      }
    }
  }

  checkForCanvasCollision({ canvas }) {
    if (this.hitbox.position.y + this.hitbox.height + this.velocity.y > canvas.height) this.velocity.y = 0
    if (this.hitbox.position.x + this.velocity.x <= 0) this.velocity.x = 0
    if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= canvas.width) this.velocity.x = 0
  }

  applyGravity() {
    this.position.y += this.velocity.y
    this.velocity.y += this.gravity
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 63 * this.scale,
        y: this.position.y + 55 * this.scale
      },
      width: 22 * this.scale,
      height: 48 * this.scale
    }
  }

}
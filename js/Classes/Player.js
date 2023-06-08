class Player extends Sprite {
  constructor({
    position,
    imageSrc,
    frameRate,
    frameBuffer,
    scale = 1.5,
    animations,
    collisionMap
  }) {
    super({ position, imageSrc, frameRate, frameBuffer, scale })

    this.velocity = {
      x: 0,
      y: 1
    }

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 32,
      height: 32
    }

    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y - 200
      },
      width: 500,
      height: 400
    }

    this.lastDirection = ['right']
    this.animations = animations

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image
    }

    this.debug = false

    this.collidableBlocks = collisionMap.collidableBlocks
    this.collisionMap = collisionMap
    this.gravity = .12
  }

  update() {

    if (this.debug) {

      //desenha regiçao do camerabox
      c.fillStyle = 'rgba(0, 0,255,.3)'
      c.fillRect(
        this.camerabox.position.x,
        this.camerabox.position.y,
        this.camerabox.width,
        this.camerabox.height
      )

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

  shouldPanCameraDown({ camera, canvas }) {
    if (this.camerabox.position.y + camera.position.y + this.velocity.y <= 0) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldPanCameraUp({ camera, canvas }) {
    if (this.camerabox.position.y + this.camerabox.height + camera.position.y + this.velocity.y >= canvas.height) {
      camera.position.y -= this.velocity.y
    }
  }


  shouldWorldExpand() {
    const worldLimitIndex = this.collisionMap.collidableBlocks.length - 1
    const worldLimit = this.collisionMap.collidableBlocks[worldLimitIndex]
    if (this.camerabox.position.y <= worldLimit.position.y) {
      this.collisionMap.genereteChunk()
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
              collidableBlock.symbol = 6
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

  switchSprite(key) {
    if (this.image === this.animations[key] && !this.loaded) return

    this.image = this.animations[key].image
    this.frameBuffer = this.animations[key].frameBuffer
    this.frameRate = this.animations[key].frameRate
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

  applyGravity() {
    this.position.y += this.velocity.y
    this.velocity.y += this.gravity
  }

  checkForCanvasCollision({ canvas }) {
    if (this.hitbox.position.y + this.hitbox.height + this.velocity.y > canvas.height) this.velocity.y = 0
    if (this.hitbox.position.x + this.velocity.x <= 0) this.velocity.x = 0
    if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= canvas.width) this.velocity.x = 0
  }


  gameover({ camera, force }) {
    if (this.velocity.y > 20 || force) {
      this.position.y = 100
      this.velocity.y = 0
      camera.position.y = 100
      this.collisionMap.resetMap()
      this.collidableBlocks = this.collisionMap.collidableBlocks
    }
  }
}
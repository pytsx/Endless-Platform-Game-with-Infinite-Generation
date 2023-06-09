class Player extends GameEntity {
  constructor({
    ...all
  }) {
    super({
      velocity: {
        x: 0,
        y: 1
      },
      ...all
    })

    this.lastDirection = ['right']

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

    const playerVelecityBoost = 20

    if (this.camerabox.position.y <= worldLimit.position.y) {

      for (let i = 0; i < this.collisionMap.chunkGenerationRate; i++) {
        this.collisionMap.genereteChunk()
      }

      this.velocity.y += -playerVelecityBoost
    }
  }


  checkForCoinCollision({ coins }) {
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i]

      if (coinCollision({
        object1: this.hitbox,
        object2: coin
      })) {
        coin.symbol = ENV.collidable.explosion.key
      }
    }
  }



  gameover({ camera, force }) {
    if (this.velocity.y > 25 || force) {
      this.position.y = 100
      this.velocity.y = 0
      camera.position.y = 100
      this.collisionMap.resetMap()
      this.collidableBlocks = this.collisionMap.collidableBlocks
      this.switchSprite('Attack')

    }
  }
}
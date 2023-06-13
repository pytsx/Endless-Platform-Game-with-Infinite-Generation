class GameObject extends CollisionBlock {
  constructor({ position, id, env, sprite }) {
    super({
      position,
      symbol: env.key,
      id
    })
    this.env = env

    this.sprite = new Sprite(
      {
        position,
        imageSrc: sprite.imageSrc,
        frameBuffer: sprite.frameBuffer,
        frameRate: sprite.frameRate,
        animations: sprite.animations,
        scale: sprite.scale
      }
    )
  }

  effect({ player }) {
    // player.velocity.y = -40
  }

  update() {
    if (this.symbol == ENV.collidable.null) return

    if (this.symbol == this.env.key) {
      this.sprite.updateFrames()
      this.sprite.draw()
    }
  }
}
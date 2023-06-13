
class Potion extends GameObject {
  constructor({ position, id }) {
    super({
      id,
      position,
      env: ENV.collidable.potion,
      sprite: {
        imageSrc: './Sprites/potion_2.png',
        frameBuffer: 14,
        frameRate: 7,
        scale: .50,
        animations: {
          potion: {
            imageSrc: './Sprites/potion.png',
            frameBuffer: 14,
            frameRate: 7,
          },
          potion2: {
            imageSrc: './Sprites/potion_2.png',
            frameBuffer: 14,
            frameRate: 7,
            scale: .50
          },
          potion3: {
            imageSrc: './Sprites/potion_3.png',
            frameBuffer: 14,
            frameRate: 7,
            scale: .50
          },
        }
      },
    })
    this.active = true
  }


  effect({ player }) {
    if (this.active) {

      player.scoreMultiplicator += 3

      player.velocity.y += -20
      player.switchSprite('Attack')
      setTimeout(() => {
        player.scoreMultiplicator -= 3
      }, 10000)
      this.active = false
    }
  }

}
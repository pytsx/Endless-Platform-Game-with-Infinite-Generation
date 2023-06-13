
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

    this.active = true
  }


  effect({ player }) {
    if (this.active) {
      player.score += 1 * player.scoreMultiplicator
      this.active = false
    }
  }

}
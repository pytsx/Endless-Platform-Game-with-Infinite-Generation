class CollisionBlock {
  constructor({
    position,
    width = 32,
    height = 32,
    symbol,
    id
  }) {
    this.position = position
    this.width = width
    this.height = height
    this.symbol = symbol
    this.id = id
  }

  draw() {
    for (let key in ENV.collidable) {
      const item = ENV.collidable[key]
      if (this.symbol == item.key) {
        c.fillStyle = item.color
        break
      } else {
        c.fillStyle = 'transparent'
      }
    }
    c.font = '16px Arial'
    c.fillRect(this.position.x, this.position.y, this.width + 1, this.symbol == 1 ? this.height / 2 : this.height + 1)
    if (DEBUG) {
      c.fillText(this.symbol, this.position.x - 4 + this.width / 2, this.position.y + 7 + this.height / 2,)
    }
  }

  update() {
    this.draw()
  }
}
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
    if (
      this.symbol == 1
      || this.symbol == 2
      || this.symbol == 3
    ) {

      c.fillStyle = 'rgba(155, 155, 155, 0.5)'
    } else {

      c.fillStyle = 'rgba(0, 155, 0, 0)'
    }
    c.fillRect(this.position.x, this.position.y, this.width - 1, this.symbol == 1 ? this.height / 2 : this.height - 1)
  }

  update() {
    this.draw()
  }
}
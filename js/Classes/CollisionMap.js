class CollisionMap extends Matriz2D {
  constructor() {
    super()
    this.mapWidth = 32
    this.tileWidth = 32

    this.init({
      x: this.mapWidth,
      y: 18
    })
    this.chunkCounter = 0
    this.collidableBlocks = []
    this.id = 0

    this.get().forEach((row, y) => {
      row.forEach((symbol, x) => {
        // if (symbol != 0) {
        this.collidableBlocks.push(
          new CollisionBlock({
            position: {
              x: x * this.tileWidth,
              y: y * this.tileWidth
            },
            symbol,
            id: this.id
          })
        )
        // }
        this.id++
      })
    })


  }

  update() {
    this.collidableBlocks.forEach(collidableBlock => {
      collidableBlock.update()
    })
    this.testCollision()
  }

  genereteWorldBorder(height) {
    let newMatriz = this.newMatriz(this.mapWidth, height)
    let alturaMapa = this.collidableBlocks[this.collidableBlocks.length - 1].position.y
    newMatriz = insertBlock(newMatriz)
    newMatriz.forEach((row, y) => {
      row.forEach((symbol, x) => {
        // if (symbol != 0) {
        this.collidableBlocks.push(
          new CollisionBlock({
            position: {
              x: x * this.tileWidth,
              y: -(y * this.tileWidth) - (this.chunkCounter == 0 ? 0 : Math.abs(alturaMapa)) - this.tileWidth
            },
            symbol,
            id: this.id
          })
        )
        // }
        this.id++
      })
    })
  }

  genereteChunk() {
    this.genereteWorldBorder(20)
    this.chunkCounter++
  }



  testCollision() {
    let chunk = 640
    let numero = 0
    numero = getRandomNumber(1, 32 - 5)


    this.collidableBlocks[numero].symbol = 2
    this.collidableBlocks[numero + 1].symbol = 1
    this.collidableBlocks[numero + 2].symbol = 1
    this.collidableBlocks[numero + 3].symbol = 2



  }


}
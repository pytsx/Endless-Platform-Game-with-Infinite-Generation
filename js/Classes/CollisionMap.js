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

    this.generateSpawner()

  }



  update() {
    this.collidableBlocks.forEach(collidableBlock => {
      collidableBlock.update()
    })
  }

  genereteWorldBorder(height) {
    let newMatriz = this.newMatriz(this.mapWidth, height)
    let alturaMapa = this.collidableBlocks[this.collidableBlocks.length - 1].position.y

    newMatriz = this.insertBlock(newMatriz)

    newMatriz.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (collidableBlocksFilter(symbol)) {
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
          this.id++
        }
      })
    })
  }

  genereteChunk() {
    this.genereteWorldBorder(20)
    this.chunkCounter++
  }

  generateSpawner() {
    this.get().forEach((row, y) => {
      row.forEach((symbol, x) => {

        if (collidableBlocksFilter(symbol)) {

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
          this.id++
        }
      })
    })
  }

  resetMap() {
    this.clearMap()
    this.generateSpawner()
  }

  clearMap() {
    this.collidableBlocks = [];
    this.id = 0;
    this.chunkCounter = 0

    this.get().forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (collidableBlocksFilter(symbol)) {

          this.collidableBlocks.push(
            new CollisionBlock({
              position: {
                x: x * this.tileWidth,
                y: y * this.tileWidth
              },
              symbol,
              id: this.id
            })
          );
          this.id++;
        }
      });
    });
  }
}
class Matriz2D {
  constructor() {
    this.matriz = []
    this.matrizGenerated = []
    this.blocksGenerated = []
  }

  init({ x = 32, y = 18 }) {
    for (let i = 0; i < y; i++) {
      let row
      if (i != y - 1) {
        row = Array(x).fill(ENV.collidable.empty.key)
      } else {
        row = Array(x).fill(ENV.collidable.world_border.key)
      }
      if (i == 2) {
        row = Array(x).fill(ENV.collidable.platform_border.key)
      }

      row[0] = ENV.collidable.world_border.key
      row[x - 1] = ENV.collidable.world_border.key
      this.matriz.push(row)
    }
  }

  push(arr) {
    this.matriz.push(arr)
  }

  newMatriz(x, y) {
    let newMatriz = []
    for (let i = 0; i < y; i++) {
      let row = Array(x).fill(0)
      row[0] = ENV.collidable.world_border.key
      row[31] = ENV.collidable.world_border.key
      newMatriz.push(row)
    }
    return newMatriz
  }

  get() {
    return this.matriz
  }

  insertBlock(matriz) {
    let { firstHalf, secondHalf } = this.sliceMatriz(matriz)

    firstHalf = this.mountHalfMatriz(firstHalf)
    secondHalf = this.mountHalfMatriz(secondHalf)

    let mountedMatriz = [...firstHalf, ...secondHalf]
    this.matrizGenerated.push(mountedMatriz)

    return mountedMatriz;
  }

  mountHalfMatriz(halfMatriz) {

    halfMatriz = this.insertNewPlatform(halfMatriz)

    return halfMatriz
  }

  insertNewPlatform(matriz) {
    let matrizLength = matriz.length
    let rowLength = matriz[0].length

    let structure1 = [2, 1, 1, 2]
    let structure2 = [1, 1, 1, 1]
    let structure3 = [1, 2, 2, 1]
    let structure4 = [2, 2]
    let structure5 = [2]
    let structure6 = [1]

    // MARGIN AND PADDING
    let worldPadding = 2
    let marginRight = structure1.length + worldPadding

    let xMinIndex = worldPadding
    let yMinIndex = worldPadding

    let xMaxIndex = rowLength - marginRight

    let yMaxIndex = matrizLength - worldPadding

    let yNewBlockIndex = getRandomNumber(yMinIndex, yMaxIndex)
    let xNewBlockIndex = getRandomNumber(xMinIndex, xMaxIndex)

    let randomAppear = this.blocksGenerated % 100 == 0

    let level1 = this.blocksGenerated < 100
    let level2 = this.blocksGenerated < 200
    let level3 = this.blocksGenerated < 300
    let level4 = this.blocksGenerated < 400
    let level5 = this.blocksGenerated < 500
    let level6 = this.blocksGenerated > 500

    let structure = level1
      ? structure1
      : level2
        ? structure2
        : level3
          ? structure3
          : level4
            ? structure4
            : level5
              ? structure5
              : level6
                ? structure6
                : structure1

    matriz = this.replaceMultipleCoordanate({
      structure,
      matriz,
      position: {
        x: xNewBlockIndex,
        y: yNewBlockIndex
      }
    })


    return matriz
  }

  replaceMultipleCoordanate({
    structure,
    matriz,
    position
  }) {
    const length = structure.length

    for (let i = 0; i < length; i++) {
      const newSymbol = structure[i]

      matriz = this.replaceCoordanate({
        matriz,
        x: position.x + i,
        y: position.y,
        newSymbol
      })
    }

    return matriz

  }

  replaceCoordanate({ matriz, x, y, newSymbol }) {
    matriz[y][x] = newSymbol
    this.blocksGenerated++

    return matriz
  }



  sliceMatriz(matriz) {
    let halfIndex = matriz.length / 2
    let firstHalf = matriz.slice(0, halfIndex)
    let secondHalf = matriz.slice(halfIndex)
    return {
      firstHalf,
      secondHalf
    }
  }
}
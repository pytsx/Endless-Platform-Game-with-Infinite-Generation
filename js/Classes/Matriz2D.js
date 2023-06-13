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
    const platformStructure = this.defineRandomStructure({
      structures: [
        [2, 1, 1, 2],
        [1, 1, 1, 1],
        [1, 2, 2, 1],
        [2, 2],
        [2],
        [1],
      ]
    })
    const coinStructure = this.defineRandomStructure({
      structures: [
        [0],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6,],
        [6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6],
        [6, 6, 6],
        [6, 6],
        [6],
        [6],
        [6],
        [6],
        [6],
        [6],
      ]
    })

    const potionStructure = this.defineRandomStructure({
      structures: [
        [0],
        [7],
        [7],
      ]
    })

    let matrizWithPlatform = this.insertNewStructure({ matriz: halfMatriz, structure: platformStructure })
    let matrizWithCoin = this.insertNewStructure({ matriz: matrizWithPlatform, structure: coinStructure })
    let matrizWithPotion = this.insertNewStructure({ matriz: matrizWithCoin, structure: potionStructure })

    return matrizWithPotion
  }

  defineRandomStructure({ structures }) {
    let randomNumber = getRandomNumber(0, 30) // Gerar um número aleatório entre 0 e 100

    if (randomNumber < structures.length - 1) {
      return structures[randomNumber]
    } else {
      return structures[0]
    }
  }

  insertNewStructure({ matriz, structure }) {
    let matrizLength = matriz.length
    let rowLength = matriz[0].length

    // MARGIN AND PADDING
    let worldPadding = 2
    let marginRight = structure.length + worldPadding

    let xMinIndex = worldPadding
    let yMinIndex = worldPadding

    let xMaxIndex = rowLength - marginRight

    let yMaxIndex = matrizLength - worldPadding

    let yNewBlockIndex = getRandomNumber(yMinIndex, yMaxIndex)
    let xNewBlockIndex = getRandomNumber(xMinIndex, xMaxIndex)

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
    if (matriz[y][x] == 0) {

      matriz[y][x] = newSymbol
    } else {
      y += 1
      matriz[y][x] = newSymbol

    }
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
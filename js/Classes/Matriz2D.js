class Matriz2D {
  constructor() {
    this.matriz = []
    this.matrizGenerated = []
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

    firstHalf = this.mountHalfMatriz(firstHalf, 1)
    secondHalf = this.mountHalfMatriz(secondHalf, 2)

    let mountedMatriz = [...firstHalf, ...secondHalf]
    this.matrizGenerated.push(mountedMatriz)

    return mountedMatriz;
  }

  mountHalfMatriz(half, part) {
    let length = half.length
    let worldMarginFromBorder = 5

    let yNovaEntidade = getRandomNumber(0, length > 1 ? length - 1 : length)
    let xNovaEntidade = getRandomNumber(2, 32 - worldMarginFromBorder)

    if (part == 1) {
      for (let i = 0; i < length; i++) {
        let row = half[i]
        for (let j = 0; j < row.length; j++) {
          let symbol = row[j]
          if (symbol == 0) {
            half[i][j] = ENV.collidable.first_chunk.key
          }
        }
      }
    } else if (part == 2) {
      for (let i = 0; i < length; i++) {
        let row = half[i]
        for (let j = 0; j < row.length; j++) {
          let symbol = row[j]
          if (symbol == 0) {
            half[i][j] = ENV.collidable.second_chunk.key
          }
        }
      }
    }

    if (yNovaEntidade < length && yNovaEntidade > 2 && yNovaEntidade < (length - 2)) {
      half[yNovaEntidade][xNovaEntidade] = ENV.collidable.platform_border.key
      half[yNovaEntidade][xNovaEntidade + 1] = ENV.collidable.platform_inside.key
      half[yNovaEntidade][xNovaEntidade + 2] = ENV.collidable.platform_inside.key
      half[yNovaEntidade][xNovaEntidade + 3] = ENV.collidable.platform_border.key
    } else this.mountHalfMatriz(half, part)
    return half
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
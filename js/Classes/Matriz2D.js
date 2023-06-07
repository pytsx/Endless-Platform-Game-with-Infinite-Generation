class Matriz2D {
  constructor() {
    this.matriz = []
  }

  init({ x = 32, y = 18 }) {
    for (let i = 0; i < y; i++) {
      let row
      if (i != y - 1) {
        row = Array(x).fill(0)
      } else {
        row = Array(x).fill(3)
      }

      row[0] = 3
      row[x - 1] = 3
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
      row[0] = 3
      row[31] = 3
      newMatriz.push(row)
    }
    return newMatriz
  }

  get() {
    // // para inverter uma matriz 2D é preciso interar com loop for para executar o .reverse()
    // this.newMatriz()
    // const matrizInvertida = this.matriz.slice().reverse();
    // for (let i = 0; i < matrizInvertida.length; i++) {
    //   matrizInvertida[i] = matrizInvertida[i].slice().reverse();
    // }
    return this.matriz
  }

  update() {
    this.draw()
  }

  draw() { }

}
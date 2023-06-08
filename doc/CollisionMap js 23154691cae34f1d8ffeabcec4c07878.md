# CollisionMap.js

```jsx
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
```

## **Classe CollisionMap**

A classe **`CollisionMap`** é uma extensão da classe **`Matriz2D`** e representa um mapa de colisões em forma de matriz 2D. Ele possui métodos para inicializar o mapa, gerar blocos colidíveis, atualizar o mapa e resetar o mapa para seu estado inicial.

### **Construtor**

```
constructor()
```

O construtor da classe **`CollisionMap`** inicializa os atributos e chama os métodos de inicialização do mapa e geração dos blocos colidíveis.

### Atributos

- **`mapWidth`**: A largura do mapa em unidades de bloco.
- **`tileWidth`**: A largura de cada bloco em pixels.
- **`chunkCounter`**: Contador para controlar a geração de chunks.
- **`collidableBlocks`**: Um array que armazena os blocos colidíveis presentes no mapa.
- **`id`**: Um identificador único para cada bloco colidível.

### Métodos

### **`generateSpawner()`**

```
generateSpawner()
```

O método **`generateSpawner()`** gera os blocos colidíveis inicialmente, percorrendo a matriz e criando instâncias de **`CollisionBlock`** para cada símbolo válido encontrado. Os blocos colidíveis são armazenados no array **`collidableBlocks`**.

### **`update()`**

```
update()
```

O método **`update()`** percorre todos os blocos colidíveis presentes no mapa e chama o método **`update()`** de cada um deles.

### **`generateWorldBorder(height)`**

```
generateWorldBorder(height)
```

O método **`generateWorldBorder(height)`** gera uma borda para o mundo adicionando linhas ao mapa. A altura da borda é especificada pelo parâmetro **`height`**. O método cria uma nova matriz, insere um bloco colidível em cada posição válida e adiciona esses blocos colidíveis ao array **`collidableBlocks`**. A altura do mapa é calculada com base no último bloco colidível presente e o valor de **`chunkCounter`** é utilizado para ajustar a posição vertical dos blocos.

### **`generateChunk()`**

```
generateChunk()
```

O método **`generateChunk()`** gera um novo "chunk" no mapa, adicionando uma nova borda ao mundo através do método **`generateWorldBorder()`** e incrementando o valor de **`chunkCounter`**.

### **`resetMap()`**

```
resetMap()
```

O método **`resetMap()`** limpa o mapa atual e gera novamente os blocos colidíveis utilizando os métodos **`clearMap()`** e **`generateSpawner()`**.

### **`clearMap()`**

```
clearMap()
```

O método **`clearMap()`** limpa o mapa atual, removendo todos os blocos colidíveis presentes e resetando os valores dos atributos **`collidableBlocks`**, **`id`** e **`chunkCounter`**. Em seguida, gera novamente os blocos colidíveis utilizando o método **`generateSpawner()`**.
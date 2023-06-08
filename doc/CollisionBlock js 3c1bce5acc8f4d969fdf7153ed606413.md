# CollisionBlock.js

```jsx
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
```

# Documentação da Classe CollisionBlock

A classe CollisionBlock representa um bloco de colisão em um jogo. É utilizado para definir as áreas do jogo em que os jogadores não podem atravessar, criando limites para o jogo.

## Construtor

### Parâmetros

- `position`: o objeto de posição do bloco de colisão
- `width`: a largura do bloco de colisão. O valor padrão é 32
- `height`: a altura do bloco de colisão. O valor padrão é 32
- `symbol`: o símbolo utilizado para representar o bloco de colisão
- `id`: um identificador exclusivo para o bloco de colisão

## Métodos

### `draw()`

Esse método é responsável por desenhar o bloco de colisão na tela do jogo. Ele utiliza a informação do objeto de posição do bloco de colisão, a largura e a altura do bloco, e o símbolo do bloco para desenhar um quadrado preenchido na tela.

### `update()`

Esse método é responsável por atualizar o bloco de colisão na tela do jogo. Ele chama o método `draw()` para redesenhar o bloco de colisão sempre que houver uma atualização no jogo.

## Exemplo de Uso

```
const collisionBlock = new CollisionBlock({
  position: { x: 100, y: 100 },
  width: 64,
  height: 64,
  symbol: 1,
  id: 'block-1'
})

collisionBlock.update()

```

Nesse exemplo, criamos um novo bloco de colisão com uma posição x de 100 e uma posição y de 100, uma largura de 64 e uma altura de 64, um símbolo de 1 e um identificador exclusivo de 'block-1'. Em seguida, chamamos o método `update()` para desenhar o bloco de colisão na tela do jogo.
# Player.js

```jsx
class Player extends Sprite {
  constructor({
    position,
    imageSrc,
    frameRate,
    frameBuffer,
    scale = 1.5,
    animations
  }) {
    super({ position, imageSrc, frameRate, frameBuffer, scale })

    this.velocity = {
      x: 0,
      y: 1
    }

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 32,
      height: 32
    }

    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y - 200
      },
      width: 500,
      height: 400
    }

    this.lastDirection = ['right']
    this.animations = animations

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image
    }

    this.debug = false

    this.collisionMap = new CollisionMap()
    this.collisionMap.genereteChunk()
    this.collidableBlocks = this.collisionMap.collidableBlocks
    this.gravity = .12
  }

  update() {

    if (this.debug) {

      //desenha regiçao do camerabox
      c.fillStyle = 'rgba(0, 0,255,.3)'
      c.fillRect(
        this.camerabox.position.x,
        this.camerabox.position.y,
        this.camerabox.width,
        this.camerabox.height
      )

      //desenha regiçao do hitbox
      c.fillStyle = 'rgba(155, 0,0,0.2)'
      c.fillRect(
        this.hitbox.position.x,
        this.hitbox.position.y,
        this.hitbox.width,
        this.hitbox.height
      )
      // desenha região da imagem
      c.fillStyle = 'rgba(0, 155,0,0.1)'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    this.updateFrames()
    this.updateHitbox()

    this.position.x += this.velocity.x
    this.draw()
    this.updateCamerabox()

    this.updateHitbox()
    this.checkForHorizontalCollision()
    this.applyGravity()
    this.updateHitbox()
    this.checkForVerticalCollision()
  }

  shouldPanCameraDown({ camera, canvas }) {
    if (this.camerabox.position.y + camera.position.y + this.velocity.y <= 0) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldPanCameraUp({ camera, canvas }) {
    if (this.camerabox.position.y + this.camerabox.height + camera.position.y + this.velocity.y >= canvas.height) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldWorldExpand() {
    const worldLimitIndex = this.collisionMap.collidableBlocks.length - 1
    const worldLimit = this.collisionMap.collidableBlocks[worldLimitIndex]
    if (this.camerabox.position.y <= worldLimit.position.y) {
      this.collisionMap.genereteChunk()
    }
  }

  checkForVerticalCollision() {
    let delay = 100
    for (let i = 0; i < this.collidableBlocks.length; i++) {
      const collidableBlock = this.collidableBlocks[i]
      if (
        (collidableBlock.symbol == 1
          || collidableBlock.symbol == 2
          || collidableBlock.symbol == 3
        )
        && collision({
          object1: this.hitbox,
          object2: collidableBlock
        })) {
        // quando estiver caindo
        if (this.velocity.y > 0) {
          if (collidableBlock.symbol == 1) {
            setTimeout(() => {
              collidableBlock.symbol = 6
            }, delay)
          } else if (collidableBlock.symbol == 2) {
            setTimeout(() => {
              collidableBlock.symbol = 1
            }, delay)
          }
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collidableBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collidableBlocks.length; i++) {
      const collidableBlock = this.collidableBlocks[i]

      if (
        (
          collidableBlock.symbol == 3
        ) &&
        collision({
          object1: this.hitbox,
          object2: collidableBlock
        })
      ) {

        if (this.velocity.x > 0) {
          this.velocity.x = 0
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collidableBlock.position.x - offset - 0.01
          break
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0
          const offset = this.hitbox.position.x - this.position.x
          this.position.x = collidableBlock.position.x + collidableBlock.width - offset + 0.01
          break
        }
      }
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key] && !this.loaded) return

    this.image = this.animations[key].image
    this.frameBuffer = this.animations[key].frameBuffer
    this.frameRate = this.animations[key].frameRate
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 63 * this.scale,
        y: this.position.y + 55 * this.scale
      },
      width: 22 * this.scale,
      height: 48 * this.scale
    }
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 130,
        y: this.position.y - 150
      },
      width: 500,
      height: 400
    }
  }

  applyGravity() {
    this.position.y += this.velocity.y
    this.velocity.y += this.gravity
  }

  checkForCanvasCollision({ canvas }) {
    if (this.hitbox.position.y + this.hitbox.height + this.velocity.y > canvas.height) this.velocity.y = 0
    if (this.hitbox.position.x + this.velocity.x <= 0) this.velocity.x = 0
    if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= canvas.width) this.velocity.x = 0
  }

  gameover({ camera, force }) {
    if (this.velocity.y > 20 || force) {
      this.position.y = 100
      this.velocity.y = 0
      camera.position.y = 100
      this.collisionMap.resetMap()
      this.collidableBlocks = this.collisionMap.collidableBlocks
      this.switchSprite('Attack')

    }
  }
}
```

## **Classe Player**

A classe **`Player`** estende a classe **`Sprite`** e representa um personagem controlável no jogo. O jogador pode mover-se no ambiente, interagir com objetos e colidir com obstáculos.

### **Construtor**

```
constructor({
  position,
  imageSrc,
  frameRate,
  frameBuffer,
  scale = 1.5,
  animations
})
```

O construtor da classe **`Player`** inicializa os atributos específicos do jogador, além dos atributos herdados da classe **`Sprite`**.

### Parâmetros

- **`position`**: Um objeto que representa a posição inicial do jogador no formato **`{ x, y }`**.
- **`imageSrc`**: A URL ou caminho da imagem a ser carregada como sprite do jogador.
- **`frameRate`**: O número de quadros por segundo que devem ser exibidos para a animação do jogador.
- **`frameBuffer`**: O intervalo de quadros necessário para avançar para o próximo quadro da animação do jogador.
- **`scale`**: O fator de escala a ser aplicado ao sprite do jogador. O valor padrão é 1.5.
- **`animations`**: Um objeto contendo as animações disponíveis para o jogador, com cada animação representada por uma chave e contendo as informações da animação (imagem, frameRate e frameBuffer).

### Atributos

- **`velocity`**: Um objeto que representa a velocidade atual do jogador nos eixos X e Y.
- **`hitbox`**: Um objeto que define a área de colisão do jogador.
- **`camerabox`**: Um objeto que define a área da câmera que acompanha o jogador.
- **`lastDirection`**: Um array que armazena a direção anterior do jogador.
- **`animations`**: Um objeto que armazena as animações disponíveis para o jogador.
- **`debug`**: Um booleano que indica se o modo de depuração está ativado.
- **`collisionMap`**: Uma instância da classe **`CollisionMap`** que representa o mapa de colisões do jogo.
- **`collidableBlocks`**: Uma matriz de objetos **`CollisionBlock`** representando os blocos colidíveis do mapa.
- **`gravity`**: Um valor numérico que define a gravidade aplicada ao jogador.

### Métodos

### **`update()`**

```
update()
```

O método **`update()`** atualiza o estado do jogador a cada quadro de animação. Ele chama os métodos herdados **`updateFrames()`** e **`draw()`** da classe **`Sprite`** para renderizar o jogador e atualizar a animação. Além disso, atualiza a área de colisão do jogador, aplica a gravidade, verifica as colisões com o ambiente e atualiza a área da câmera.

### **`shouldPanCameraDown({ camera, canvas })`**

```
shouldPanCameraDown({ camera, canvas })
```

O método **`shouldPanCameraDown()`** verifica se a câmera deve ser movida para baixo com base na posição do jogador. Se o jogador estiver se movendo para cima e a posição da câmera permitir, a posição da câmera é ajustada.

### **`shouldPanCameraUp({ camera, canvas })`**

```
shouldPanCameraUp({ camera, canvas })
```

O método **`shouldPanCameraUp()`** verifica se a câmera deve ser movida para cima com base na posição do jogador. Se o jogador estiver se movendo para baixo e a posição da câmera permitir, a posição da câmera é ajustada.

### **`shouldWorldExpand()`**

```
shouldWorldExpand()
```

O método **`shouldWorldExpand()`** verifica se o mundo do jogo deve ser expandido. Se a posição da câmera atingir o limite inferior definido pelo mapa de colisões, um novo chunk de colisões é gerado na classe **`CollisionMap`**, expandindo o mundo do jogo.

### **`checkForVerticalCollision()`**

```
checkForVerticalCollision()
```

O método **`checkForVerticalCollision()`** verifica se ocorreu uma colisão vertical entre o jogador e os blocos colidíveis. Se o jogador estiver caindo e colidir com um bloco colidível, sua velocidade vertical é definida como zero, sua posição é ajustada para ficar em cima do bloco e, se necessário, é aplicada uma ação especial ao bloco colidido.

### **`checkForHorizontalCollision()`**

```
checkForHorizontalCollision()
```

O método **`checkForHorizontalCollision()`** verifica se ocorreu uma colisão horizontal entre o jogador e os blocos colidíveis. Se o jogador estiver se movendo para a direita ou esquerda e colidir com um bloco colidível, sua velocidade horizontal é definida como zero e sua posição é ajustada para evitar a sobreposição com o bloco.

### **`switchSprite(key)`**

```
switchSprite(key)
```

O método **`switchSprite()`** altera a animação atual do jogador com base na chave fornecida. Se a animação correspondente à chave já estiver carregada, ela é definida como a animação atual do jogador.

### **`updateHitbox()`**

```
updateHitbox()
```

O método **`updateHitbox()`** atualiza a área de colisão do jogador com base em sua posição e escala atual. A posição, largura e altura da área de colisão são ajustadas de acordo.

### **`updateCamerabox()`**

```
updateCamerabox()
```

O método **`updateCamerabox()`** atualiza a área da câmera com base na posição atual do jogador. A posição, largura e altura da área da câmera são ajustadas de acordo.

### **`applyGravity()`**

```
applyGravity()
```

O método **`applyGravity()`** aplica a gravidade ao jogador, incrementando sua velocidade vertical e atualizando sua posição vertical.

### **`checkForCanvasCollision({ canvas })`**

```
checkForCanvasCollision({ canvas })
```

O método **`checkForCanvasCollision()`** verifica se o jogador colidiu com os limites do canvas. Se o jogador ultrapassar os limites superior, inferior, esquerdo ou direito do canvas, sua velocidade é ajustada para evitar que ele saia da área visível do jogo.

### **`gameover({ camera, force })`**

```
gameover({ camera, force })
```

O método **`gameover()`** lida com a situação de fim de jogo do jogador. Se a velocidade vertical do jogador for alta o suficiente ou se **`force`** for verdadeiro, o jogador é reiniciado para sua posição inicial, a velocidade vertical é definida como zero, a posição da câmera é ajustada, o mapa de colisões é redefinido e a animação do jogador é trocada.
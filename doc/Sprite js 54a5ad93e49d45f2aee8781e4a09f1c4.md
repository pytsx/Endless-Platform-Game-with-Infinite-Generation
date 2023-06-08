# Sprite.js

```jsx
class Sprite {
  constructor({
    position,
    imageSrc,
    frameBuffer = 10,
    frameRate = 1,
    scale = 1
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.loaded = false

    this.scale = scale

    this.frameBuffer = frameBuffer
    this.frameRate = frameRate

    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale
      this.height = this.image.height * this.scale
      this.loaded = true
    }

    this.currentFrame = 0
    this.elapseFrame = 0
  }

  draw() {
    if (!this.image) return

    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0
      },
      width: this.image.width / this.frameRate,
      height: this.image.height
    }
    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    this.draw()
    this.updateFrames()
  }

  updateFrames() {
    if (this.elapseFrame % this.frameBuffer == 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++
      else this.currentFrame = 0
    }
    this.elapseFrame++
  }
}
```

## **Classe Sprite**

A classe **`Sprite`** representa um objeto gráfico que pode ser desenhado em um canvas. Ele carrega uma imagem, controla os quadros de animação e renderiza o sprite na posição especificada.

### **Construtor**

```
constructor({
  position,
  imageSrc,
  frameBuffer = 10,
  frameRate = 1,
  scale = 1
})
```

O construtor da classe **`Sprite`** inicializa os atributos do sprite e carrega a imagem fornecida.

### Parâmetros

- **`position`**: Um objeto que representa a posição inicial do sprite no formato **`{ x, y }`**.
- **`imageSrc`**: A URL ou caminho da imagem a ser carregada como sprite.
- **`frameBuffer`**: O intervalo de quadros necessário para avançar para o próximo quadro da animação. O valor padrão é 10.
- **`frameRate`**: O número de quadros por segundo que devem ser exibidos. O valor padrão é 1.
- **`scale`**: O fator de escala a ser aplicado ao sprite. O valor padrão é 1.

### Atributos

- **`position`**: A posição atual do sprite.
- **`image`**: A imagem carregada para o sprite.
- **`loaded`**: Um booleano que indica se a imagem foi carregada com sucesso.
- **`scale`**: O fator de escala do sprite.
- **`frameBuffer`**: O intervalo de quadros necessário para avançar para o próximo quadro da animação.
- **`frameRate`**: O número de quadros por segundo que devem ser exibidos.
- **`width`**: A largura do sprite considerando o fator de escala e o número de quadros.
- **`height`**: A altura do sprite considerando o fator de escala.
- **`currentFrame`**: O índice do quadro atual da animação.
- **`elapseFrame`**: O número de quadros que se passaram desde o início da animação.

### Métodos

### **`draw()`**

```
draw()
```

O método **`draw()`** desenha o sprite no canvas, utilizando o contexto de renderização **`c`** (presumivelmente definido em outro lugar). Ele calcula a posição da área de recorte do sprite com base no quadro atual e desenha a porção apropriada da imagem.

### **`update()`**

```
update(
```

O método **`update()`** é responsável por chamar o método **`draw()`** para renderizar o sprite atualizado e chamar o método **`updateFrames()`** para avançar para o próximo quadro da animação.

### **`updateFrames()`**

```
updateFrames()
```

O método **`updateFrames()`** é responsável por atualizar o quadro atual da animação. Ele verifica se o número de quadros decorridos desde o último avanço é igual ao valor do **`frameBuffer`**. Se for, avança para o próximo quadro, considerando o **`frameRate`**. Caso contrário, incrementa o contador de quadros decorridos.
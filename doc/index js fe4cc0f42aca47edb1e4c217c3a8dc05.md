# index.js

```jsx
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const camera = {
  position: {
    x: 0,
    y: 0
  }
}

const jumpLimit = 2
let countJump = 0

let player = wizard

function animate() {
  window.requestAnimationFrame(animate)

  // desenha canvas 
  c.fillStyle = '#3d3d3d'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()

  c.translate(0, camera.position.y)

  player.collisionMap.update()
  player.update()
  player.checkForCanvasCollision({ canvas })

  c.restore()

  player.velocity.x = 0

  if (keys.a.pressed) {
    player.velocity.x = -3
    player.switchSprite('MoveLeft')
    player.lastDirection.push('left')
  } else if (keys.d.pressed) {
    player.velocity.x = 3
    player.switchSprite('Move')
    player.lastDirection.push('right')
  } else if (player.velocity.y == 0 && player.velocity.x == 0) {
    if (player.lastDirection[player.lastDirection.length - 1] === 'right') player.switchSprite('Idle')
    else player.switchSprite('IdleLeft')
  } else if (keys.o.pressed) {
    player.debug = true
    DEBUG = true
  } else if (keys.p.pressed) {
    player.debug = false
    DEBUG = false
  }

  if (player.velocity.y == 0) {
    countJump = 0
  } else if (player.velocity.y < 0) {
    player.shouldWorldExpand()
    player.shouldPanCameraDown({ canvas, camera })

  } else if (player.velocity.y > 0 || keys.r.pressed) {
    player.shouldPanCameraUp({ canvas, camera })
    player.gameover({ camera, force: keys.r.pressed })
  }

}

animate()

window.addEventListener('keydown', handleKeydown)
window.addEventListener('keyup', handleKeyup)
```

Este código é um exemplo de como animar um jogo em JavaScript utilizando a biblioteca Canvas. A função `animate()` é responsável por atualizar a posição dos objetos do jogo e desenhar as imagens no Canvas.

A variável `canvas` é um elemento HTML que representa a área de desenho do jogo. O objeto `c` representa o contexto de desenho do Canvas e é usado para desenhar as imagens e objetos na tela.

A variável `camera` é um objeto que contém as coordenadas x e y da posição da câmera. O jogo utiliza a função `translate()` do Canvas para mover a câmera e simular o movimento do jogador na tela. Isso permite que o jogador se mova pela tela, enquanto o ambiente ao seu redor permanece estático.

O objeto `player` representa o personagem controlado pelo jogador. Ele possui um mapa de colisão (`collisionMap`) que é atualizado a cada atualização do jogo. O mapa é composto por uma matriz 2D que representa os blocos de colisão no jogo. Esses blocos são gerados de forma dinâmica a partir da matriz 2D de elementos do jogo.

O objeto `player` também possui uma velocidade (`velocity`) que é atualizada de acordo com as teclas pressionadas pelo jogador. O código contém condicionais para verificar as teclas pressionadas e executar ações correspondentes, como mover o personagem ou ativar o modo de debug.

O jogo utiliza também a função `requestAnimationFrame()` para atualizar a tela de forma eficiente, garantindo uma animação suave e sem interrupções.

Em resumo, este código é um exemplo de como utilizar o Canvas para criar jogos em JavaScript e implementar a lógica do jogo, incluindo movimento do jogador e atualização da câmera. O uso da matriz 2D para gerar os chunks e blocos de colisão de forma dinâmica adiciona uma camada de complexidade e personalização ao jogo.
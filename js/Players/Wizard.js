const wizard = new Player(
  {
    position: {
      x: 50,
      y: 200
    },
    imageSrc: './Sprites/Idle.png',
    frameRate: 8,
    frameBuffer: 15,
    collisionMap,
    animations: {
      Idle: {
        imageSrc: './Sprites/Idle.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      IdleLeft: {
        imageSrc: './Sprites/IdleLeft.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      Death: {
        imageSrc: './Sprites/Death.png',
        frameRate: 8,
        frameBuffer: 25,
      },
      Move: {
        imageSrc: './Sprites/Move.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      MoveLeft: {
        imageSrc: './Sprites/MoveLeft.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      Attack: {
        imageSrc: './Sprites/Attack.png',
        frameRate: 8,
        frameBuffer: 15,
      },
      Hit: {
        imageSrc: './Sprites/Take Hit.png',
        frameRate: 4,
        frameBuffer: 25,
      }
    }
  }
)
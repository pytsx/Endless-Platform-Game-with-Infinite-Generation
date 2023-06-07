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
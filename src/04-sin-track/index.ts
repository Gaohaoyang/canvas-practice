import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball(1)
    ball.y = canvas.height
    ball.x = 0
    const speedY = 2
    const speedX = 50

    let angle = 0

    let then = 0
    const drawFrame = (time: number) => {
      const timeInSeconds = time * 0.001
      const deltaTimeInSeconds = timeInSeconds - then
      then = timeInSeconds
      ball.x += speedX * deltaTimeInSeconds
      ball.y = canvas.height / 2 + Math.sin(angle) * 50
      angle += speedY * deltaTimeInSeconds
      ball.draw(context)
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball()
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    let angle = 0

    const drawFrame = () => {
      window.requestAnimationFrame(drawFrame)
      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x = canvas.width / 2 + Math.sin(angle) * 50
      angle += 0.1
      ball.draw(context)
    }
    drawFrame()
  }
}

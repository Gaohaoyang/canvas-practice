import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball()
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    const speed = 4
    let angle = 0

    let then = 0
    const drawFrame = (time: number) => {
      const timeInSeconds = time * 0.001
      const deltaTimeInSeconds = timeInSeconds - then
      then = timeInSeconds

      window.requestAnimationFrame(drawFrame)
      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x = canvas.width / 2 + Math.sin(angle) * 50
      angle += speed * deltaTimeInSeconds
      ball.draw(context)
    }
    drawFrame(0)
  }
}

import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball(5)
    const ball2 = new Ball(50, '#3949AB')
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball2.x = canvas.width / 2
    ball2.y = canvas.height / 2
    const speed = 2
    const rx = 100
    const ry = 60

    let angle = 0

    let then = 0
    const drawFrame = (time: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const timeInSeconds = time * 0.001
      const deltaTimeInSeconds = timeInSeconds - then
      then = timeInSeconds
      ball.x = canvas.width / 2 + rx * Math.cos(angle)
      ball.y = canvas.height / 2 + ry * Math.sin(angle)
      angle += speed * deltaTimeInSeconds
      ball.draw(context)
      ball2.draw(context)
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

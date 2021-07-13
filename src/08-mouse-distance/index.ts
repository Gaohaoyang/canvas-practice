import Ball from '../common/Ball'
import { captureMouse } from '../common/utils'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')
const distanceDom: HTMLDivElement | null = document.querySelector('#distance')

if (canvas) {
  const context = canvas.getContext('2d')
  const mousePos = captureMouse(canvas)

  if (context) {
    const ball = new Ball(5, '#AED581')
    const pos1 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }
    ball.x = pos1.x
    ball.y = pos1.y

    const drawFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      ball.draw(context)
      const dx = ball.x - mousePos.x
      const dy = ball.y - mousePos.y
      const distance = Math.sqrt(dx ** 2 + dy ** 2)
      if (distanceDom) {
        distanceDom.innerHTML = String(distance)
      }

      context.save()
      context.moveTo(ball.x, ball.y)
      context.lineTo(mousePos.x, mousePos.y)
      context.closePath()
      context.stroke()

      window.requestAnimationFrame(drawFrame)
    }
    drawFrame()
  }
}

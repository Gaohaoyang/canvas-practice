import Arrow from '../common/Arrow'
import { captureMouse } from '../common/utils'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  canvas.width = 800
  canvas.height = 400
  const context = canvas.getContext('2d')
  const arrow = new Arrow()
  arrow.x = canvas.width / 2
  arrow.y = canvas.height / 2

  const pos = captureMouse(canvas)

  if (context) {
    const drawFrame = () => {
      window.requestAnimationFrame(drawFrame)
      context.clearRect(0, 0, canvas.width, canvas.height)
      if (pos.x && pos.y) {
        const dx = pos.x - arrow.x
        const dy = pos.y - arrow.y
        arrow.rotation = Math.atan2(dy, dx)
      }
      arrow.draw(context)
    }
    drawFrame()
  }
}

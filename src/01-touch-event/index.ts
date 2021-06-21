import Arrow from '../common/Arrow'
import { captureMouse } from '../common/util'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  const arrow = new Arrow()
  arrow.x = canvas.width / 2
  arrow.y = canvas.height / 2

  // const touch = captureTouch(canvas)
  const touch = captureMouse(canvas)
  console.log(touch)

  if (context) {
    // arrow.draw(context)
    const drawFrame = () => {
      window.requestAnimationFrame(drawFrame)
      context.clearRect(0, 0, canvas.width, canvas.height)
      if (touch.x && touch.y) {
        const dx = touch.x - arrow.x
        const dy = touch.y - arrow.y
        arrow.rotation = Math.atan2(dy, dx)
      }
      arrow.draw(context)
    }
    drawFrame()
  }
}

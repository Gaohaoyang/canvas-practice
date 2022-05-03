import stats from '../common/stats'
import Ball from '../common/Ball'
import { containPoint, captureMouse } from '../common/utils'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')
const textDiv: HTMLDivElement | null = document.querySelector('#text')

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball()
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2

    const mouse = captureMouse(canvas)

    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      ball.draw(context)
      // console.log(containPoint(ball.getBounds(), mouse.x, mouse.y))
      if (textDiv) {
        textDiv.insertAdjacentText(
          'beforeend',
          String(containPoint(ball.getBounds(), mouse.x, mouse.y))
        )
      }

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

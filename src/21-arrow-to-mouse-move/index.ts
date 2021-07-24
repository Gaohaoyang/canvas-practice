import stats from '../common/stats'
import Arrow from '../common/Arrow'
import { captureMouse } from '../common/utils'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v = 100 // 速度 10 像素/s

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const context = canvas.getContext('2d')

  const arrow = new Arrow()
  arrow.x = canvas.width / 2
  arrow.y = canvas.height / 2

  const mousePos = captureMouse(canvas)

  let then = 0
  if (context) {
    const drawFrame = (time: number) => {
      stats.begin()

      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTimeInSeconds = timeInSeconds - then // 每帧的间隔时间，单位s
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)
      const dx = mousePos.x - arrow.x
      const dy = mousePos.y - arrow.y
      const angle = Math.atan2(dy, dx)

      arrow.x += v * Math.cos(angle) * deltaTimeInSeconds
      arrow.y += v * Math.sin(angle) * deltaTimeInSeconds
      arrow.rotation = angle

      arrow.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const vx = 10 // x 方向速度， 10 像素/s
const vy = 20 // y 方向速度， 20 像素/s
const x0 = 20 // 初始位置
const y0 = 20

if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  if (context) {
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位

      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x = vx * timeInSeconds + x0
      ball.y = vy * timeInSeconds + y0
      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 60 // x 方向初速度， 单位 像素/s
const v0y = 0 // x 方向初速度， 单位 像素/s
const ax = 0 // x 方向加速度， 单位 像素/s^2
const ay = 600 // y 方向加速度， 单位 像素/s^2
const x0 = 60 // 初始位置
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
      ball.x = v0x * timeInSeconds + (1 / 2) * ax * timeInSeconds ** 2 + x0
      ball.y = v0y * timeInSeconds + (1 / 2) * ay * timeInSeconds ** 2 + y0

      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

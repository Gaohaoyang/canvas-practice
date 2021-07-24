import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 300 // x 方向初速度， 单位 像素/s
const v0y = 0 // x 方向初速度， 单位 像素/s
const ax = 0 // x 方向加速度， 单位 像素/s^2
const ay = 30 // y 方向加速度， 单位 像素/s^2
const x0 = 60 // 初始位置
const y0 = 20

let vy = v0y
if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  if (context) {
    let then = 0
    ball.x = x0
    ball.y = y0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTimeInSeconds = timeInSeconds - then // 每帧的间隔时间，单位s
      then = timeInSeconds

      console.log(deltaTimeInSeconds)

      // context.clearRect(0, 0, canvas.width, canvas.height)
      vy += ay * deltaTimeInSeconds
      ball.y += vy * deltaTimeInSeconds
      // ball.x += v0x * deltaTimeInSeconds
      // ball.y = v0y * timeInSeconds + (1 / 2) * ay * timeInSeconds ** timeInSeconds + y0
      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

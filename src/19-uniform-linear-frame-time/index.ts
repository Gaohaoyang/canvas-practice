import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const alpha = 45 // 角度 45 度
const v = 10 // 速度， 10 像素/s
const x0 = 20 // 初始位置
const y0 = 20

if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  ball.x = x0
  ball.y = y0

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x += v * Math.cos((alpha * Math.PI) / 180) * deltaTime
      ball.y += v * Math.sin((alpha * Math.PI) / 180) * deltaTime
      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

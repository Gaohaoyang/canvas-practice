/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = (Math.random() * 2 - 1) * 100
const v0y = (Math.random() * 2 - 1) * 200
const friction = 0.97 // 摩擦力系数

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')
  const ball = new Ball(20)
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.lineWidth = 0
  ball.vx = v0x
  ball.vy = v0y

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds
      context.clearRect(0, 0, canvas.width, canvas.height)

      ball.x += ball.vx * deltaTime
      ball.y += ball.vy * deltaTime
      ball.vx *= friction // 速度递减
      ball.vy *= friction

      ball.draw(context)
      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

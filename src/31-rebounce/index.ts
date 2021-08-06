/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 120
const v0y = -100
const gravity = 500 // 重力加速度 单位 像素/s^2
const bounce = -0.8 // 弹性系数

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')
  const ball = new Ball(20)
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.vx = v0x
  ball.vy = v0y
  ball.lineWidth = 0

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds
      context.clearRect(0, 0, canvas.width, canvas.height)

      ball.x += ball.vx * deltaTime
      ball.vy += gravity * deltaTime
      ball.y += ball.vy * deltaTime

      if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius
        ball.vy *= bounce
      }
      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius
        ball.vy *= bounce
      }

      if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius
        ball.vx *= bounce
      }
      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius
        ball.vx *= bounce
      }

      ball.draw(context)
      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

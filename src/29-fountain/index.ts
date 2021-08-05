/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const ballNum = 200 // 元素数量
const maxSpeedX = 50 // 最大水平初速度
const maxSpeedY = -400 // 最大竖直初速度
const gravity = 300 // 重力加速度 单位 像素/s^2

const colors = [
  '#81D4FA',
  '#64B5F6',
  // '#42A5F5',
  // '#2196F3',
  // '#1E88E5',
  // '#1976D2',
  // '#1565C0',
  // '#0D47A1',
]
const balls: Ball[] = []

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')

  const initBall = (ball: Ball) => {
    ball.radius = Math.random() * 3 + 4
    ball.x = canvas.width / 2
    ball.y = (canvas.height / 5) * 4
    ball.vx = (Math.random() * 2 - 1) * maxSpeedX
    ball.vy = Math.random() * maxSpeedY
  }

  if (context) {
    for (let i = 0; i < ballNum; i += 1) {
      const ball = new Ball(20, colors[i % colors.length])
      ball.lineWidth = 0
      initBall(ball)
      balls.push(ball)
    }

    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = balls.length - 1; i > -1; i -= 1) {
        balls[i].x += balls[i].vx * deltaTime
        balls[i].vy += gravity * deltaTime
        balls[i].y += balls[i].vy * deltaTime
        balls[i].draw(context)

        if (
          balls[i].x - balls[i].radius > canvas.width
          || balls[i].x + balls[i].radius < 0
          || balls[i].y - balls[i].radius > canvas.height
        ) {
          initBall(balls[i])
        }
      }

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

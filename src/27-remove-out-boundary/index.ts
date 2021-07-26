/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const ballNum = 100
const maxSpeedX = 80
const maxSpeedY = 80
const colors = [
  '#81D4FA',
  '#64B5F6',
  '#42A5F5',
  '#2196F3',
  '#1E88E5',
  '#1976D2',
  '#1565C0',
  '#0D47A1',
]
const balls: Ball[] = []

let remainBallsNum = ballNum

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')

  if (context) {
    for (let i = 0; i < ballNum; i += 1) {
      const ball = new Ball(20, colors[i % colors.length])
      ball.x = Math.random() * canvas.width
      ball.y = Math.random() * canvas.height
      ball.vx = (Math.random() * 2 - 1) * maxSpeedX
      ball.vy = (Math.random() * 2 - 1) * maxSpeedY
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
        balls[i].y += balls[i].vy * deltaTime
        balls[i].draw(context)

        if (
          balls[i].x - balls[i].radius > canvas.width
          || balls[i].x + balls[i].radius < 0
          || balls[i].y - balls[i].radius > canvas.height
          || balls[i].y + balls[i].radius < 0
        ) {
          balls.splice(i, 1)
        }
      }

      if (remainBallsNum !== balls.length) {
        remainBallsNum = balls.length
        console.log(`remain balls: ${remainBallsNum}`)
        const showText = document.querySelector('#text')
        if (showText) {
          showText.innerHTML = `remain balls: ${remainBallsNum}`
        }
      }

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

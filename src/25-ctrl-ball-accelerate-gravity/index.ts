import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 0 // x 方向初速度， 单位 像素/s
const v0y = 0 // x 方向初速度， 单位 像素/s
let ax = 0 // x 方向加速度， 单位 像素/s^2
let ay = 0 // y 方向加速度， 单位 像素/s^2
const gravity = 50
const x0 = window.innerWidth / 2 // 初始位置
const y0 = window.innerHeight / 2

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowLeft':
        ax = -100
        break
      case 'ArrowRight':
        ax = 100
        break
      case 'ArrowUp':
        ay = -100
        break
      case 'ArrowDown':
        ay = 100
        break
      default:
        break
    }
  })
  document.addEventListener('keyup', () => {
    ax = 0
    ay = 0
  })

  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  ball.x = x0
  ball.y = y0
  let vx = v0x
  let vy = v0y

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      vx += ax * deltaTime
      vy += ay * deltaTime
      vy += gravity * deltaTime

      ball.x += vx * deltaTime
      ball.y += vy * deltaTime

      ball.draw(context)
      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

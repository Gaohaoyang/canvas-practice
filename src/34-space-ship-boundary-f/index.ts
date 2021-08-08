import stats from '../common/stats'
import Ship from '../common/Ship'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const aRotation = 80 // 飞船旋转角加速度
const aThrust = 50 // 推进加速度
const x0 = window.innerWidth / 2 // 初始位置
const y0 = window.innerHeight / 2
const friction = 0.996

let aRotationShip = 0 // 旋转角加速度
let vRotationShip = 0 // 旋转角速度
let aThrustShip = 0 // 推进加速度
let vThrustShip = 0 // 推进速度

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const top = 0
  const right = canvas.width
  const bottom = canvas.height
  const left = 0

  const ship = new Ship()
  ship.x = x0
  ship.y = y0

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowLeft':
        aRotationShip = -aRotation
        break
      case 'ArrowRight':
        aRotationShip = aRotation
        break
      case 'ArrowUp':
        aThrustShip = aThrust
        ship.showFlame = true
        break
      case 'ArrowDown':
        aThrustShip = -aThrust
        break
      default:
        break
    }
  })
  document.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        aRotationShip = 0
        break
      case 'ArrowUp':
        aThrustShip = 0
        ship.showFlame = false
        break
      case 'ArrowDown':
        aThrustShip = -aThrust
        break
      default:
        break
    }
  })

  const context = canvas.getContext('2d')

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      vRotationShip += aRotationShip * deltaTime
      ship.rotation += (vRotationShip * deltaTime * Math.PI) / 180

      vThrustShip += aThrustShip * deltaTime
      if (vThrustShip <= 0) {
        vThrustShip = 0
      }
      const angle = ship.rotation

      vThrustShip *= friction
      ship.x += vThrustShip * deltaTime * Math.cos(angle)
      ship.y += vThrustShip * deltaTime * Math.sin(angle)

      if (ship.x - ship.width / 2 > right) {
        ship.x = left - ship.width / 2
      } else if (ship.x + ship.width / 2 < left) {
        ship.x = right + ship.width / 2
      }
      if (ship.y - ship.height / 2 > bottom) {
        ship.y = top - ship.height / 2
      } else if (ship.y + ship.height / 2 < top) {
        ship.y = bottom + ship.height / 2
      }

      ship.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}

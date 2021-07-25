import stats from '../common/stats'
import Ship from '../common/Ship'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const aRotation = 80 // 飞船旋转角加速度
const aThrust = 50 // 推进加速度
const x0 = window.innerWidth / 2 // 初始位置
const y0 = window.innerHeight / 2

let aRotationShip = 0 // 旋转角加速度
let vRotationShip = 0 // 旋转角速度
let aThrustShip = 0 // 推进加速度
let vThrustShip = 0 // 推进速度

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

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
  document.addEventListener('keyup', () => {
    aRotationShip = 0
    aThrustShip = 0
    ship.showFlame = false
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
      ship.x += vThrustShip * deltaTime * Math.cos(angle)
      ship.y += vThrustShip * deltaTime * Math.sin(angle)

      ship.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }

    drawFrame(0)
  }
}

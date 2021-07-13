import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')
const distanceDom: HTMLDivElement | null = document.querySelector('#distance')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball(5, '#AED581')
    const ball2 = new Ball(5, '#3949AB')
    const pos1 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }
    const pos2 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }
    ball.x = pos1.x
    ball.y = pos1.y
    ball2.x = pos2.x
    ball2.y = pos2.y

    const drawFrame = () => {
      ball.draw(context)
      ball2.draw(context)
      const dx = ball.x - ball2.x
      const dy = ball.y - ball2.y
      const distance = Math.sqrt(dx ** 2 + dy ** 2)
      if (distanceDom) {
        distanceDom.insertAdjacentHTML('beforeend', String(distance))
      }
    }
    drawFrame()
  }
}

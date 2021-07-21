import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const points = []
    const num = 4

    for (let i = 0; i < num; i += 1) {
      const ball = new Ball(2)
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      points.push({
        x,
        y,
      })
      ball.x = x
      ball.y = y
      ball.draw(ctx)
    }

    const xAv1 = (points[0].x + points[num - 1].x) / 2
    const yAv1 = (points[0].y + points[num - 1].y) / 2

    ctx.beginPath()
    ctx.moveTo(xAv1, yAv1)

    for (let i = 0; i < num - 1; i += 1) {
      const xAv = (points[i].x + points[i + 1].x) / 2
      const yAv = (points[i].y + points[i + 1].y) / 2
      ctx.quadraticCurveTo(points[i].x, points[i].y, xAv, yAv)
    }
    ctx.quadraticCurveTo(points[num - 1].x, points[num - 1].y, xAv1, yAv1)
    ctx.stroke()
  }
}

export {}

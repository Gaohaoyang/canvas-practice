const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.beginPath()
    const gradient = ctx.createLinearGradient(100, 100, 200, 200)
    gradient.addColorStop(0, '#ff0000')
    gradient.addColorStop(1, '#000000')
    ctx.fillStyle = gradient
    ctx.fillRect(100, 100, 100, 100)

    const gradient2 = ctx.createLinearGradient(200, 200, 300, 300)
    gradient2.addColorStop(0, '#ff0000')
    gradient2.addColorStop(0.6, '#008880')
    gradient2.addColorStop(1, '#000000')
    ctx.fillStyle = gradient2
    ctx.fillRect(200, 200, 100, 100)

    const gradient3 = ctx.createRadialGradient(500, 200, 0, 500, 200, 100)
    gradient3.addColorStop(0, '#000000')
    gradient3.addColorStop(1, '#ff0000')
    ctx.arc(500, 200, 100, 0, 2 * Math.PI)
    ctx.fillStyle = gradient3
    ctx.fill()
  }
}

export {}

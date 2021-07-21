const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  const { offsetLeft, offsetTop } = canvas

  const x0 = 300
  const y0 = 100
  const x1 = 600
  const y1 = 300

  if (context) {
    canvas.addEventListener('mousemove', (e) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const x = e.pageX - offsetLeft
      const y = e.pageY - offsetTop

      const cpx = x * 2 - (x0 + x1) / 2
      const cpy = y * 2 - (y0 + y1) / 2

      context.beginPath()
      context.moveTo(x0, y0)
      context.quadraticCurveTo(cpx, cpy, x1, y1)
      context.stroke()
    })
  }
}

export {}

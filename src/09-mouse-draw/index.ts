const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  if (context) {
    const { offsetLeft, offsetTop } = canvas
    let x
    let y

    const mouseMoveHandler = (e: MouseEvent) => {
      x = e.pageX
      y = e.pageY
      x -= offsetLeft
      y -= offsetTop
      context.lineTo(x, y)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.stroke()
    }

    canvas.addEventListener('mousedown', (e) => {
      context.beginPath()
      context.moveTo(e.pageX - offsetLeft, e.pageY - offsetTop)
      canvas.addEventListener('mousemove', mouseMoveHandler)
    })

    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', mouseMoveHandler)
    })
  }
}

export {}

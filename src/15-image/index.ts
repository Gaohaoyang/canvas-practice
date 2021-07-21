const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const img = new Image()
    img.src = 'https://gw.alicdn.com/imgextra/i2/O1CN01gR6ymq1dfV5RmYxYk_!!6000000003763-2-tps-658-411.png'
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, 658, 329, 0, 0, 800, 400)
    })
  }
}

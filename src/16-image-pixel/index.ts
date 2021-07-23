const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const img = new Image()
    img.src = '../assets/1.png'
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, 658, 329, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i + 1] = 0
      }
      ctx.putImageData(imageData, 0, 0)
    })
  }
}

export {}

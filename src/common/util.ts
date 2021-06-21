interface touchType {
  x: null | number
  y: null | number
  isTouch: boolean
}

const captureTouch = (element: HTMLElement) => {
  console.log('captureTouch')
  const touch: touchType = {
    x: null,
    y: null,
    isTouch: false,
  }
  element.addEventListener('touchstart', () => {
    touch.isTouch = true
  })
  element.addEventListener('touchend', () => {
    touch.isTouch = false
    touch.x = null
    touch.y = null
  })
  element.addEventListener('touchmove', (e) => {
    const { pageX, pageY } = e.touches[0]
    touch.x = pageX
    touch.y = pageY
  })
  return touch
}

const captureMouse = (element: HTMLElement) => {
  const mouse = {
    x: 0,
    y: 0,
  }
  element.addEventListener('mousemove', (e) => {
    mouse.x = e.pageX
    mouse.y = e.pageY
  })
  return mouse
}

export { captureTouch, captureMouse }

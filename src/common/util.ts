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
    console.log('captureTouch touchmove')
    const { pageX, pageY } = e.touches[0]
    touch.x = pageX
    touch.y = pageY
  })
  return touch
}

const captureMouse = () => {}

export { captureTouch, captureMouse }

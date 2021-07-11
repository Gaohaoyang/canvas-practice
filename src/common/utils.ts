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
  const mouse: {
    x: number
    y: number
    event: MouseEvent | null
  } = {
    x: 0,
    y: 0,
    event: null,
  }
  const { offsetLeft, offsetTop } = element

  element.addEventListener('mousemove', (e) => {
    let x
    let y
    x = e.pageX
    y = e.pageY
    x -= offsetLeft
    y -= offsetTop
    mouse.x = x
    mouse.y = y
    mouse.event = e
  })
  return mouse
}

export { captureTouch, captureMouse }

import { captureTouch } from '../common/util'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')
console.log(canvas)
if (canvas) {
  const touch = captureTouch(canvas)
  console.log(touch)
  if (touch.isTouch) {
    console.log(touch)
  }
}

console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

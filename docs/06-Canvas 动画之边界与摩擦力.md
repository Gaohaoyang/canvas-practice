我们在先前的文章中介绍了大量的基础知识，已经学会了如何使用 canvas 绘图 API 绘制图形，并使其在各种里的作用下运动。然而真实世界存在着边界，本篇文章将围绕以下两个方面来进行学习和讲解。

- 环境边界
- 摩擦力

# 环境边界

大多数情况下，一个简单的矩形就可以构成一个边界，我们就从最简单的例子开始，基于 canvas 大小的边界。

我们处理判断物体越界呢？一般有以下 4 种方式

- 移除物体
- 重置会边界内
- 出现在边界的另一个对称位置
- 反弹会边界内

我们先来从移除物体开始

## 移除物体

如果物体不断产生，那么将物体越界后移除是比较好的做法，也会使得性能更好。

当多个物体在移动时，应该将他们的引用保存在一个数组中，再遍历整个数组来移动它们。可以使用 `splice()` 方法移除数组中的元素。接下来举个例子，在画布中随机位置放置100个小球，以不超过最大速度的随机的速度运动，越界后将小球移除。

代码如下

```js
/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const ballNum = 100
const maxSpeedX = 80
const maxSpeedY = 80
const colors = [
  '#81D4FA',
  '#64B5F6',
  '#42A5F5',
  '#2196F3',
  '#1E88E5',
  '#1976D2',
  '#1565C0',
  '#0D47A1',
]
const balls: Ball[] = []

let remainBallsNum = ballNum

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')

  if (context) {
    for (let i = 0; i < ballNum; i += 1) {
      const ball = new Ball(20, colors[i % colors.length])
      ball.x = Math.random() * canvas.width
      ball.y = Math.random() * canvas.height
      ball.vx = (Math.random() * 2 - 1) * maxSpeedX
      ball.vy = (Math.random() * 2 - 1) * maxSpeedY
      balls.push(ball)
    }

    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = balls.length - 1; i > -1; i -= 1) {
        balls[i].x += balls[i].vx * deltaTime
        balls[i].y += balls[i].vy * deltaTime
        balls[i].draw(context)

        if (
          balls[i].x - balls[i].radius > canvas.width
          || balls[i].x + balls[i].radius < 0
          || balls[i].y - balls[i].radius > canvas.height
          || balls[i].y + balls[i].radius < 0
        ) {
          balls.splice(i, 1)
        }
      }

      if (remainBallsNum !== balls.length) {
        remainBallsNum = balls.length
        console.log(`remain balls: ${remainBallsNum}`)
      }

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01TSECuB1xbBfxaQWu1_!!6000000006461-1-tps-683-417.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/27-remove-out-boundary/index.html](https://gaohaoyang.github.io/canvas-practice/27-remove-out-boundary/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/27-remove-out-boundary/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/27-remove-out-boundary/index.ts)

值的注意的是，需要使用数组存放小球，可以使用 splice 删除数组元素。计算是否越界是需要考虑小球半径。

```js
if (
  balls[i].x - balls[i].radius > canvas.width
  || balls[i].x + balls[i].radius < 0
  || balls[i].y - balls[i].radius > canvas.height
  || balls[i].y + balls[i].radius < 0
) {
  balls.splice(i, 1)
}
```

由于改变了数组长度，遍历时需要逆向遍历，否则会导致下标错乱，反馈在页面上则是小球可能闪动。

```js
for (let i = balls.length - 1; i > -1; i -= 1) {
  ...
}
```

# 摩擦力

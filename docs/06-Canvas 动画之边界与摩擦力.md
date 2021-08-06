我们在先前的文章中介绍了大量的基础知识，已经学会了如何使用 canvas 绘图 API 绘制图形，并使其在各种里的作用下运动。然而真实世界存在着边界，本篇文章将围绕以下两个方面来进行学习和讲解。

- 环境边界
- 摩擦力

# 环境边界

大多数情况下，一个简单的矩形就可以构成一个边界，我们就从最简单的例子开始，基于 canvas 大小的边界。

我们处理判断物体越界呢？一般有以下 4 种方式

- 移除物体
- 重置在边界内
- 出现在边界的另一个对称位置
- 反弹回边界内

我们先来从移除物体开始

## 移除物体

如果物体不断产生，那么将物体越界后移除是比较好的做法，也会使得性能更好。

当多个物体在移动时，应该将他们的引用保存在一个数组中，再遍历整个数组来移动它们。可以使用 `splice()` 方法移除数组中的元素。接下来举个例子，在画布中随机位置放置 100 个小球，以不超过最大速度的随机的速度运动，越界后将小球移除。

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
          balls[i].x - balls[i].radius > canvas.width ||
          balls[i].x + balls[i].radius < 0 ||
          balls[i].y - balls[i].radius > canvas.height ||
          balls[i].y + balls[i].radius < 0
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
  balls[i].x - balls[i].radius > canvas.width ||
  balls[i].x + balls[i].radius < 0 ||
  balls[i].y - balls[i].radius > canvas.height ||
  balls[i].y + balls[i].radius < 0
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

## 重置在边界内

大致思路是，当物体移出边界时，我们会重新设定其位置。这样可以源源不断的提供运动物体，又不用担心 canvas 上的物体过多以至于影响浏览器速度，因为物体的数量是不变的。

例如我们做一个飘雪的动画，当雪花落地后，再重置到画面顶部。

```js
/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const ballNum = 100 // 元素数量
const maxSpeedX = 20 // 最大水平初速度
const maxSpeedY = 0 // 最大竖直初速度
const gravity = 4 // 重力加速度 单位 像素/s^2

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

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')

  const initBall = (ball: Ball, firstInit = false) => {
    ball.radius = Math.random() * 3 + 4
    ball.x = Math.random() * canvas.width
    ball.y = -Math.random() * canvas.height * (firstInit ? 2 : 1)
    ball.vx = (Math.random() * 2 - 1) * maxSpeedX
    ball.vy = Math.random() * maxSpeedY
  }

  if (context) {
    for (let i = 0; i < ballNum; i += 1) {
      const ball = new Ball(20, colors[i % colors.length])
      ball.lineWidth = 0
      initBall(ball, true)
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
        balls[i].vy += gravity * deltaTime
        balls[i].y += balls[i].vy * deltaTime
        balls[i].draw(context)

        if (
          balls[i].x - balls[i].radius > canvas.width ||
          balls[i].x + balls[i].radius < 0 ||
          balls[i].y - balls[i].radius > canvas.height
        ) {
          initBall(balls[i])
        }
      }

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

核心代码为

```js
if (
  balls[i].x - balls[i].radius > canvas.width ||
  balls[i].x + balls[i].radius < 0 ||
  balls[i].y - balls[i].radius > canvas.height
) {
  initBall(balls[i])
}
```

超出边界后将其重置。

![](https://gw.alicdn.com/imgextra/i3/O1CN01TxLCSH1ql4v785sbm_!!6000000005535-1-tps-291-509.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/28-snow/index.html](https://gaohaoyang.github.io/canvas-practice/28-snow/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/28-snow/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/28-snow/index.ts)

上述代码稍微改造，便可做出类似喷泉的效果：

![](https://gw.alicdn.com/imgextra/i4/O1CN01o5BXVh1GwgnMLfdn8_!!6000000000687-1-tps-291-509.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/29-fountain/index.html](https://gaohaoyang.github.io/canvas-practice/29-fountain/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/29-fountain/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/29-fountain/index.ts)

## 出现在边界的另一个对称位置

当元素从屏幕左边移出，会在屏幕右侧出现；右侧移出，会在左侧出现；上下也类似。

我们使用上一章《canvas 动画之速度与加速度》中的 demo 宇宙飞船，我们稍微修改一下代码，让其在移出画布时，在另一个对称位置出现。

核心修改的代码如下：

```js
const top = 0
const right = canvas.width
const bottom = canvas.height
const left = 0

···

if (ship.x - ship.width / 2 > right) {
  ship.x = left - ship.width / 2
} else if (ship.x + ship.width / 2 < left) {
  ship.x = right + ship.width / 2
}
if (ship.y - ship.height / 2 > bottom) {
  ship.y = top - ship.height / 2
} else if (ship.y + ship.height / 2 < top) {
  ship.y = bottom + ship.height / 2
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01oWFExA1YpVffhIui4_!!6000000003108-1-tps-503-301.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/30-space-ship-boundary/index.html](https://gaohaoyang.github.io/canvas-practice/30-space-ship-boundary/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/30-space-ship-boundary/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/30-space-ship-boundary/index.ts)

## 反弹回边界内

反弹需要做的是当元素即将离开屏幕时，保持其位置不变只改变其速度方向。

```js
/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 120
const v0y = -100
const gravity = 500 // 重力加速度 单位 像素/s^2
const bounce = -0.8 // 弹性系数

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')
  const ball = new Ball(20)
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.vx = v0x
  ball.vy = v0y
  ball.lineWidth = 0

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds
      context.clearRect(0, 0, canvas.width, canvas.height)

      ball.x += ball.vx * deltaTime
      ball.vy += gravity * deltaTime
      ball.y += ball.vy * deltaTime

      if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius
        ball.vy *= bounce
      }
      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius
        ball.vy *= bounce
      }

      if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius
        ball.vx *= bounce
      }
      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius
        ball.vx *= bounce
      }

      ball.draw(context)
      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

其核心代码为

```js
if (ball.y + ball.radius > canvas.height) {
  ball.y = canvas.height - ball.radius
  ball.vy *= bounce
}
if (ball.y - ball.radius < 0) {
  ball.y = ball.radius
  ball.vy *= bounce
}
if (ball.x + ball.radius > canvas.width) {
  ball.x = canvas.width - ball.radius
  ball.vx *= bounce
}
if (ball.x - ball.radius < 0) {
  ball.x = ball.radius
  ball.vx *= bounce
}
```

注意我们还将回弹后的速度减小了一些，来模拟真实的弹性损耗。

![](https://gw.alicdn.com/imgextra/i2/O1CN01opxfMg1cmzxclGomA_!!6000000003644-1-tps-503-296.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/31-rebounce/index.html](https://gaohaoyang.github.io/canvas-practice/31-rebounce/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/31-rebounce/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/31-rebounce/index.ts)

# 摩擦力

```

```

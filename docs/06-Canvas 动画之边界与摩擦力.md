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

注意我们还将回弹后的速度减小了一些，来模拟真实的弹性损耗（上述代码中的 `bounce` 变量）。

![](https://gw.alicdn.com/imgextra/i2/O1CN01opxfMg1cmzxclGomA_!!6000000003644-1-tps-503-296.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/31-rebounce/index.html](https://gaohaoyang.github.io/canvas-practice/31-rebounce/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/31-rebounce/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/31-rebounce/index.ts)

# 摩擦力

目前我们实现的运动均为理想状态，忽略了现实世界中的摩擦力。也可以说是阻力、阻尼。现在我们考虑阻尼的情况。


## 摩擦力的标准解法

![](https://gw.alicdn.com/imgextra/i3/O1CN01xLivZd1X3ac4g7UcR_!!6000000002868-2-tps-414-254.png)

如图，如果已知 vx 和 vy，我们需要先计算出其和速度 v，再进行不断地递减这个 v。我们不能分别再 x, y 轴上分别减小速度，因为可能会导致某个轴上速度为 0，而另一个轴上依然在运动的奇怪现象。

```js
/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = (Math.random() * 2 - 1) * 100
const v0y = (Math.random() * 2 - 1) * 200
const frictionV = 1 // 摩擦力产生的减速速度

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')
  const ball = new Ball(20)
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.lineWidth = 0
  ball.vx = v0x
  ball.vy = v0y

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds
      context.clearRect(0, 0, canvas.width, canvas.height)

      let v = Math.sqrt(ball.vx ** 2 + ball.vy ** 2) // 计算合速度
      const angle = Math.atan2(ball.vy, ball.vx) // 计算角度

      if (v > frictionV) {
        v -= frictionV // 速度递减
      } else {
        v = 0
      }

      ball.vx = v * Math.cos(angle) // 重新算出分速度
      ball.vy = v * Math.sin(angle)
      ball.x += ball.vx * deltaTime // 计算位移
      ball.y += ball.vy * deltaTime

      ball.draw(context)
      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01hnanPO1eo25XvnGlB_!!6000000003917-1-tps-364-595.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/32-friction/index.html](https://gaohaoyang.github.io/canvas-practice/32-friction/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/32-friction/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/32-friction/index.ts)

## 摩擦力的简便解法

上述做法使用了勾股定理，和多个三角函数。其实摩擦力可以直接分别在 x, y 方向的速度乘一个小于 1 的系数进行模拟，一般用户也无法察觉有什么不妥。

```js
/* eslint-disable no-param-reassign */
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = (Math.random() * 2 - 1) * 100
const v0y = (Math.random() * 2 - 1) * 200
const friction = 0.97 // 摩擦力系数

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')
  const ball = new Ball(20)
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.lineWidth = 0
  ball.vx = v0x
  ball.vy = v0y

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds
      context.clearRect(0, 0, canvas.width, canvas.height)

      ball.x += ball.vx * deltaTime
      ball.y += ball.vy * deltaTime
      ball.vx *= friction // 速度递减
      ball.vy *= friction

      ball.draw(context)
      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01eUnrxz1ZEhS7Ms5FG_!!6000000003163-1-tps-364-595.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/33-friction-easy/index.html](https://gaohaoyang.github.io/canvas-practice/33-friction-easy/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/33-friction-easy/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/33-friction-easy/index.ts)

## 宇宙飞船加点摩擦力

我们在本章的宇宙飞船示例中增加一点摩擦力

```js
const friction = 0.996

...

vThrustShip *= friction

```

代码很简单，增加了摩擦力的速度衰减系数，再针对推进速度进行衰减。

效果如下：

![](https://gw.alicdn.com/imgextra/i1/O1CN01dqxaUK1GhZioH9OOy_!!6000000000654-1-tps-625-367.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/34-space-ship-boundary-f/index.html](https://gaohaoyang.github.io/canvas-practice/34-space-ship-boundary-f/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/34-space-ship-boundary-f/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/34-space-ship-boundary-f/index.ts)

# 总结

本章我们学习了物体碰撞边界时的操作，包括移除、重置、屏幕环绕、反弹这些情况。并且还学习掌握了摩擦力，使用这个简单的系数，可以使得运动更加逼真。

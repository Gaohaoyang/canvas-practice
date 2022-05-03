本章将学习鼠标和触摸事件，如何处理拖拽、抛落和投掷。不过，先从基本的按下与释放说起。

- 按下及释放物体
- 拖拽物体
- 投掷物体

# 按下及释放物体

首先我们研究一下如何判断鼠标移入一个物体，我们依然使用先前的 `Ball` 类，为其添加一个新的方法 `getBounds`，返回一个恰好容纳小球的矩形，也可以称之为边界。返回的对象包含 `x, y, width, height`，更新后的 Ball.js 如下

```js
class Ball {
  radius: number

  color: string

  x: number

  y: number

  lineWidth: number

  vx: number

  vy: number

  constructor(radius: number = 40, color: string = '#795548') {
    this.radius = radius
    this.color = color
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.lineWidth = 1
  }

  /**
   * draw
   */
  public draw(context: CanvasRenderingContext2D) {
    context.save()
    context.translate(this.x, this.y)
    context.lineWidth = this.lineWidth
    context.fillStyle = this.color
    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    if (this.lineWidth > 0) {
      context.stroke()
    }
    context.restore()
  }

  /**
   * getBounds
   */
  public getBounds() {
    return {
      x: this.x - this.radius, // 边界左上角的点x
      y: this.y - this.radius, // 边界左上角的点y
      width: this.radius * 2,
      height: this.radius * 2,
    }
  }
}

export default Ball
```

再增加一个 utils 判断一个点是否在一个矩形区域，代码如下

```js
/**
 * 是否包含在区域内
 */
const containPoint = (
  rect: {
    x: number
    y: number
    width: number
    height: number
  },
  x: number,
  y: number,
) => x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height
```



# 拖拽物体

# 投掷物体


export default class Particle {
  constructor ({ x = 0, y = 0, vx = 0, vy = 0, radius = 15, restitution = 0.8, gravity = 0.25, color = '#ffffff', context }) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.ctx = context
    this.gravity = gravity
    this.restitution = restitution
    this.radius = radius
    this.color = color
    this.playing = false
  }

  start = () => {
    this.playing = true
    this.render()
    this.update()
  }

  stop = () => {
    this.playing = false
    cancelAnimationFrame(this.animationFrame)
  }

  clear = () => {
    const dim = this.radius * 2
    this.ctx.clearRect(this.x - this.radius, this.y - this.radius, dim, dim)
  }

  update = () => {
    this.clear()
    const boundX = this.ctx.canvas.width
    const boundY = this.ctx.canvas.height

    // Update
    this.vy += this.gravity
    this.y += this.vy

    this.vx += this.gravity
    this.x += this.vx

    if (this.y >= boundY - this.radius) {
      // GROUND
      this.vy *= -this.restitution
      this.y = boundY - this.radius
    } else if (this.y <= 0 + this.radius) {
      // CEILING
      this.vy *= -this.restitution
      this.y = 0 + this.radius
    }

    if (this.x >= boundX - this.radius) {
      // RIGHT WALL
      this.vx *= -this.restitution
      this.x = boundX - this.radius
    } else if (this.x <= 0 + this.radius) {
      // LEFT WALL
      this.vx *= -this.restitution
      this.x = 0 + this.radius
    }

    if (this.playing) {
      setTimeout(() => {
        this.update()
      }, 1000 / 60)
    }
  }

  render = () => {
    // Render
    const startAngle = 0
    const endAngle = 2 * Math.PI
    this.ctx.fillStyle = this.color
    this.ctx.moveTo(this.x, this.y)
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle)
    this.ctx.stroke()
    this.ctx.fill()
    this.animationFrame = requestAnimationFrame(() => { this.render() })
  }
}

export default class Particle {
  constructor ({ x = 0, y = 0, vx = 0, vy = 0, radius = 50, restitution = 0.8, gravity = 0.25, color = '#ffffff' }) {
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.gravity = gravity
    this.restitution = restitution
    this.radius = radius
    this.color = color
  }

  update = ({ boundY, boundX }) => {
    // Update
    this.vy += this.gravity
    this.y += this.vy

    // The ball hit the ground
    if (this.y >= boundY - this.radius || this.y <= boundY) {
      this.vy *= -this.restitution
      this.y = boundY - this.radius
    } else if (this.x >= boundX - this.radius || this.x <= boundX) {
      this.vx *= -this.restitution
      this.x = boundX - this.radius
    }

    setTimeout(() => {
      this.update({ boundY, boundX })
    }, 1000 / 60)
  }

  render = (ctx) => {
    const dim = this.radius * 2
    ctx.clearRect(this.x, this.y, dim, dim)
    // Render
    const startAngle = 0
    const endAngle = 2 * Math.PI
    ctx.fillStyle = this.color
    ctx.moveTo(this.x, this.y)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, startAngle, endAngle)
    ctx.stroke()
    ctx.fill()
    requestAnimationFrame(() => { this.render(ctx) })
  }
}

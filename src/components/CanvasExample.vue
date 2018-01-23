<template lang="pug">
  .canvasExample
    .canvasExample__container
      h5(v-html="selectField.text")
      canvas(ref="canvas", :width="canvasWidth", :height="canvasHeight")
      .buttons
        select(v-model="selectField", @change="selectChange")
          option(v-for="option in options", :value="option" v-html="option.text")
        button(@click="draw") draw
        button(@click="clear") clear
        button(@click="stop") stop
</template>

<script>
import debug from 'debug'
let log = debug('component:CanvasExample')
export default {
  name: 'canvasExample',
  props: [],
  data () {
    const options = [
      { value: 'draw-line', text: 'draw line' },
      { value: 'draw-circle', text: 'draw circle' },
      { value: 'draw-rect', text: 'draw rect' },
      { value: 'animate-line-progress', text: 'animate line progress' },
      { value: 'animate-line-move', text: 'animate line move' },
      { value: 'animate-ball', text: 'animate ball' }
    ]

    return {
      canvasWidth: 0,
      canvasHeight: 0,
      selectField: options[0],
      options,
      colors: {
        green: '#42b983',
        white: '#ffffff'
      }
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
    log('Mounted')
    this.setCanvasSize()
  },
  computed: {
  },
  methods: {
    setupListeners () {
      window.addEventListener('resize', this.windowResize.bind(this))
    },
    setCanvasSize () {
      this.canvasWidth = window.innerWidth * 0.6
      this.canvasHeight = window.innerHeight * 0.3
      this.draw()
    },
    windowResize () {
      this.setCanvasSize()
    },
    clear () {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
    },
    selectChange () {
      this.stop()
    },
    stop () {
      window.cancelAnimationFrame(this.animationFrame)
      this.clear()
    },
    draw () {
      switch (this.selectField.value) {
        case 'draw-line':
          this.drawLine()
          break
        case 'draw-circle':
          this.drawCircle()
          break
        case 'draw-rect':
          this.drawRect()
          break
        case 'animate-line-progress':
          this.animateLine({ x: 0, y: this.$refs.canvas.height / 2 })
          break
        case 'animate-line-move':
          this.animateLine({ x: 0, y: this.$refs.canvas.height / 2, clear: true })
          break
        case 'animate-ball':
          this.animateBall({ x: this.$refs.canvas.width, y: this.$refs.canvas.height, ceiling: this.$refs.canvas.height / 2, dx: 4, dy: 4 })
          break
        default:
          return
      }
    },
    /**
     * DRAW LINE
     */
    drawLine () {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.strokeStyle = this.colors.white
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(this.canvasWidth, this.canvasHeight)
      ctx.stroke()
    },
    /**
     * DRAW CIRCLE
     */
    drawCircle () {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      // calculate the center of the canvas
      const xPos = canvas.width / 2
      const yPos = canvas.height / 2
      const radius = 40
      const startAngle = 0
      const endAngle = 2 * Math.PI

      // Stroke & fill
      ctx.lineWidth = 10
      ctx.strokeStyle = this.colors.white
      ctx.fillStyle = this.colors.green
      ctx.moveTo(xPos, yPos)
      ctx.beginPath()
      ctx.arc(xPos, yPos, radius, startAngle, endAngle)
      ctx.stroke()
      ctx.fill()
    },
    /**
     * DRAW RECT
     */
    drawRect () {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const dimension = 100

      // Positions
      const xPos = (canvas.width / 2) - (dimension / 2)
      const yPos = (canvas.height / 2) - (dimension / 2)

      // Gradient
      const myGradient = ctx.createLinearGradient(xPos, yPos, xPos + dimension, yPos + dimension)
      myGradient.addColorStop(0, this.colors.white)
      myGradient.addColorStop(1, this.colors.green)
      ctx.fillStyle = myGradient
      ctx.fillRect(xPos, yPos, dimension, dimension)
    },
    /**
     * ANIMATE LINE
     */
    animateLine ({ x, y, clear, dx = 1 }) {
      if (clear) { this.clear() }
      let newDx = dx
      let newX = x + newDx
      const ctx = this.$refs.canvas.getContext('2d')
      const extent = 100
      ctx.strokeStyle = this.colors.white
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(newX, y)
      ctx.lineTo(newX + extent, y)
      ctx.stroke()
      // Bounce off the walls of the canvas
      if (newX <= 0 || newX >= this.$refs.canvas.width - extent) {
        debugger // eslint-disable-line
        newDx = -newDx
      }
      this.animationFrame = requestAnimationFrame(() => { this.animateLine({ x: newX, y, clear, dx: newDx }) })
    }
  },
  /**
   * ANIMATE BALL
   */
  animateBall ({ x = 0, y = 0, ceiling, dx = 4, dy = 4 }) {
    debugger // eslint-disable-line
    const canvas = this.$refs.canvas
    const ctx = canvas.getContext('2d')

    // CREATE THE BALL
    // calculate the center of the canvas
    const xPos = canvas.width / 2
    const yPos = canvas.height / 2
    const radius = 40
    const startAngle = 0
    const endAngle = 2 * Math.PI

    ctx.fillStyle = this.colors.green
    ctx.moveTo(xPos, yPos)
    ctx.beginPath()
    ctx.arc(xPos, yPos, radius, startAngle, endAngle)
    ctx.stroke()
    ctx.fill()

    let newCeiling = ceiling
    let newDy = dy
    if (y >= ceiling) {
      newCeiling = ceiling / 2
      newDy = -dy
    }
    let newY = y + newDy

    this.animationFrame = requestAnimationFrame(() => { this.animateBall({ x, y: newY, ceiling: newCeiling, dx, dy: newDy }) })
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.canvasExample {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: $brandDark;

  &__container{
    display: inline-block;
    h5{
      text-align: center;
    }
    canvas{
      border: 1px solid $black;
      background-color: $black;
    }
    .buttons{
      margin: 0;
      padding: 0;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      button, select{
        margin-right: 10px;
        &:last-child{ margin-right: 0; }
      }
    }
  }
}
</style>

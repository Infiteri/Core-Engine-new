export class Color {
  constructor(r = 255, g = 255, b = 255, a = 255) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  To32Array() {
    const { r, g, b, a } = this

    return new Float32Array([r / 255, g / 255, b / 255, a / 255])
  }
}

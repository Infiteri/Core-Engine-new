import { Matrix4x4 } from '../math/Matrix4x4.js'

export class OrthographicCamera {
  constructor() {
    this.left = 0
    this.right = innerWidth
    this.bottom = innerHeight
    this.top = 0
    this.far = 1
    this.near = -1

    this.projection = Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.far,
      this.near
    )
  }

  Get32Projection() {
    return this.projection.ToFloat32Array()
  }

  Recalculate() {
    this.right = innerWidth
    this.bottom = innerHeight

    this.projection = Matrix4x4.OrthoGraphic(
      this.left,
      this.right,
      this.bottom,
      this.top,
      this.far,
      this.near
    )
  }
}

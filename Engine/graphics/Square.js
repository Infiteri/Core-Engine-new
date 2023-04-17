import { Vector3 } from '../math/Vector3.js'
import { Renderer } from '../renderer/Renderer.js'
import { Object2D } from './Object2D.js'

/**
 * GRAPHICS ONLY
 */
export class Square extends Object2D {
  constructor(width = 100, height = 100) {
    super()

    this.width = width
    this.height = height

    const data = [
      0,
      0,
      0,

      //
      0,
      this.height,
      0,

      //
      this.width,
      this.height,
      0,

      //
      this.width,
      this.height,
      0,
      //
      this.width,
      0,
      0,

      0,
      0,
      0,
    ]

    this.buffer.elementSize = 3
    this.buffer.AddData(data)
    this.buffer.AddLayout(0, 0, 3)
    this.buffer.Init()
    this.buffer.Unbind()

    this.position = new Vector3(0, 0, 0)
  }

  Render() {
    super.Render()

    this.buffer.Bind()
    this.buffer.Draw()
    this.buffer.Unbind()
  }
}

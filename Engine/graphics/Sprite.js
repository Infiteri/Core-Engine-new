import { Matrix4x4 } from '../math/Matrix4x4.js'
import { Vector3 } from '../math/Vector3.js'
import { Renderer } from '../renderer/Renderer.js'
import { Buffer } from '../renderer/webgl/Buffer.js'
import { Texture } from '../renderer/webgl/Texture.js'
import { Object2D } from './Object2D.js'

/**
 * GRAPHICS ONLY
 */
export class Sprite extends Object2D {
  constructor(materialName, width = 100, height = 100) {
    super(materialName)

    this.width = width
    this.height = height

    const data = [
      0,
      0,
      0,
      0,
      0,

      //
      0,
      this.height,
      0,
      0,
      1,

      //
      this.width,
      this.height,
      0,
      1,
      1,

      //
      this.width,
      this.height,
      0,
      1,
      1,
      //
      this.width,
      0,
      0,
      1,
      0,

      0,
      0,
      0,
      0,
      0,
    ]

    this.buffer = new Buffer({
      elementSize: 5,
    })

    this.buffer.AddData(data)
    this.buffer.AddLayout(0, 0, 3)
    this.buffer.AddLayout(1, 3, 2)
    this.buffer.Init()
    this.buffer.Unbind()
  }

  Render() {
    //Uploading matrices
    super.Render()

    this.buffer.Bind()
    this.buffer.Draw()
    this.buffer.Unbind()
  }
}
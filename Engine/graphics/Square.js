import { Vector3 } from '../math/Vector3.js'
import { Vertex } from '../math/Vertex.js'
import { Buffer } from '../renderer/webgl/Buffer.js'
import { Object2D } from './Object2D.js'

/**
 * GRAPHICS ONLY
 */
export class Square extends Object2D {
  constructor(materialName, width = 100, height = 100) {
    super(materialName)

    this.width = width
    this.height = height

    this.vertices = [
      new Vertex(0, 0, 0),
      new Vertex(0, this.height, 0),
      new Vertex(this.width, this.height, 0),
      new Vertex(this.width, this.height, 0),
      new Vertex(this.width, 0, 0),
      new Vertex(0, 0, 0),
    ]

    this.buffer = new Buffer({
      elementSize: 5,
    })
    this.buffer.AddData(Vertex.GetArray(this.vertices))
    this.buffer.AddLayout(0, 0, 3)
    this.buffer.Init()
    this.buffer.Unbind()

  }

  Render(model) {
    super.Render(model)

    this.buffer.Bind()
    this.buffer.Draw()
    this.buffer.Unbind()
  }
}

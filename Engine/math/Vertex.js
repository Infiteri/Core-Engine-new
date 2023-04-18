import { Vector2 } from './VEctor2.js'
import { Vector3 } from './Vector3.js'

export class Vertex {
  constructor(x = 0, y = 0, z = 0, u = 0, v = 0) {
    this.position = new Vector3(x, y, z)
    this.uvs = new Vector2(u, v)
  }

  ToArray() {
    return [
      this.position.x,
      this.position.y,
      this.position.z,
      this.uvs.x,
      this.uvs.y,
    ]
  }

  static GetArray(vertexArray) {
    let d = []

    for (const v of vertexArray) {
      d.push(...v.ToArray())
    }

    return d
  }
}

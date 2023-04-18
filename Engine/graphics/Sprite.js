import { Engine } from '../core/Engine.js'
import { Vector2 } from '../math/VEctor2.js'
import { Vertex } from '../math/Vertex.js'
import { Buffer } from '../renderer/webgl/Buffer.js'
import { Object2D } from './Object2D.js'

class UVInfo {
  /**
   *
   * @param {Vector2} min
   * @param {Vector2} max
   */
  constructor(min, max) {
    this.min = min
    this.max = max
  }
}

/**
 * GRAPHICS ONLY
 */
export class Sprite extends Object2D {
  constructor(materialName, width = 100, height = 100) {
    super(materialName)

    this.width = width
    this.height = height

    /** @type {UVInfo[]} */
    this.frameUVs = []

    this.currentFrame = 0

    this.animation = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    this._frames = 1

    this.time = 0
  }

  get frames() {
    return this._frames
  }

  set frames(value) {
    this._frames = value
    // this.CalculateUVs()
  }

  CalculateUVs() {
    const frameWidth = this.width / this.frames

    //Calculate UUs
    let totalWidth = 0
    let yValue = 0

    for (let i = 0; i < this.frames; i++) {
      totalWidth = i * frameWidth

      if (totalWidth > this.width) {
        totalWidth = 0
        yValue++
      }

      let u = (i * frameWidth) / this.width
      let v = (yValue * this.height) / this.height
      let min = new Vector2(u, v)

      let uMax = (i * frameWidth + frameWidth) / this.width
      let vMax = (yValue * this.height + this.height) / this.height
      let max = new Vector2(uMax, vMax)

      this.frameUVs.push(new UVInfo(min, max))
    }
  }

  Init() {
    super.Init()

    this.CalculateUVs()

    //Setup sprite

    this.vertices = [
      new Vertex(0, 0, 0, 0, 0),
      new Vertex(0, this.height, 0, 0, 1),
      new Vertex(this.width / this.frames, this.height, 0, 1, 1),
      new Vertex(this.width / this.frames, this.height, 0, 1, 1),
      new Vertex(this.width / this.frames, 0, 0, 1, 0),
      new Vertex(0, 0, 0, 0, 0),
    ]

    this.buffer = new Buffer({
      elementSize: 5,
    })

    this.buffer.AddData(Vertex.GetArray(this.vertices))
    this.buffer.AddLayout(0, 0, 3)
    this.buffer.AddLayout(1, 3, 2)
    this.buffer.Init()
    this.buffer.Unbind()
  }

  Render(model) {
    this.time += Engine.GetDeltaTime()

    //Uploading matrices
    super.Render(model)

    if (this.time >= 0.2) {
      if (this.currentFrame < this.frames - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }

      const uvs = this.frameUVs[this.animation[this.currentFrame]]
      this.vertices[0].uvs.CopyFrom(uvs.min)
      this.vertices[1].uvs = new Vector2(uvs.min.x, uvs.max.y)
      this.vertices[2].uvs.CopyFrom(uvs.max)
      this.vertices[3].uvs.CopyFrom(uvs.max)
      this.vertices[4].uvs = new Vector2(uvs.max.x, uvs.min.y)
      this.vertices[5].uvs.CopyFrom(uvs.min)

      this.buffer.ReUpload(Vertex.GetArray(this.vertices))
      this.time = 0
      // console.log(uvs)
      // console.log(this.animation[this.currentFrame])
    }

    this.buffer.Bind()
    this.buffer.Draw()
    this.buffer.Unbind()
  }
}

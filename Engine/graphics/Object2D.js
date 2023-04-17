import { MaterialManager } from '../manager/MaterialManager.js'
import { Matrix4x4 } from '../math/Matrix4x4.js'
import { Vector3 } from '../math/Vector3.js'
import { Renderer } from '../renderer/Renderer.js'
import { Buffer } from '../renderer/webgl/Buffer.js'

export class Object2D {
  constructor(materialName) {
    this.materialName = materialName
    this.position = new Vector3(0, 0, 0)
    this.material = MaterialManager.Get(this.materialName)

    this.buffer = new Buffer({
      elementSize: 0,
    })
  }

  Init() {}

  Render() {
    const translation = Matrix4x4.Translation(this.position)
    Renderer.shader.Mat4('uModel', translation.ToFloat32Array())

    this.material.Use()
  }

  Update() {}
}

import { MaterialManager } from '../manager/MaterialManager.js'
import { Renderer } from '../renderer/Renderer.js'
import { Buffer } from '../renderer/webgl/Buffer.js'

export class Object2D {
  constructor(materialName) {
    this.materialName = materialName
    this.material = MaterialManager.Get(this.materialName)

    this.buffer = new Buffer({
      elementSize: 0,
    })
  }

  Init() {}

  Render(model) {
    if (model) {
      Renderer.shader.Mat4('uModel', model.ToFloat32Array())
    }

    this.material.Use()
  }

  Update() {}
}

import { Sprite } from '../../graphics/Sprite.js'
import { Matrix4x4 } from '../../math/Matrix4x4.js'
import { Component } from './Component.js'

export class SpriteComponent extends Component {
  constructor(name = 'SpriteComponent', materialName, width, height) {
    super(name)

    this.sprite = new Sprite(materialName, width, height)
  }

  Init() {
    super.Init()
    this.sprite.Init()
  }

  Render() {
    super.Render()
    this.sprite.Render(
      Matrix4x4.Multiply(this.parent._worldMatrix, this.transform.GetMatrix())
    )
  }
}

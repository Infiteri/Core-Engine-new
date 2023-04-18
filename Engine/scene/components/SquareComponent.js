import { Square } from '../../graphics/Square.js'
import { Matrix4x4 } from '../../math/Matrix4x4.js'
import { Component } from './Component.js'

export class SquareComponent extends Component {
  constructor(name = 'SpriteComponent', materialName, width, height) {
    super(name)

    this.square = new Square(materialName, width, height)
  }

  Init() {
    super.Init()
    this.square.Init()
  }

  Render() {
    super.Render()
    this.square.Render(
      Matrix4x4.Multiply(this.parent._worldMatrix, this.transform.GetMatrix())
    )
  }
}

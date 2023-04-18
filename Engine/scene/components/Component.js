import { Transform } from '../../math/Transform.js'
import { GameObject } from '../GameObject.js'

export class Component {
  constructor(name = 'Component') {
    this.name = name

    /** @type {GameObject} */
    this.parent = null

    this.transform = new Transform()
  }

  Init() {}

  Render() {}
}

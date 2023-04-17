import { Renderer } from '../renderer/Renderer.js'

export class Window {
  constructor() {
    this.canvas = document.querySelector('canvas')

    this.width = innerWidth
    this.height = innerHeight

    this._SetData()
    this._Resizing()
  }

  /** @private */
  _SetData() {
    this.width = innerWidth
    this.height = innerHeight

    this.canvas.width = this.width
    this.canvas.height = this.height

    Renderer.ResizeViewport(this.width, this.height)
    Renderer.camera.Recalculate()
  }

  /** @private */
  _Resizing() {
    window.onresize = () => {
      this._SetData()
    }
  }
}

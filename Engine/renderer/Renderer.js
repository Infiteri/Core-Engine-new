import { BaseShader } from './BaseShader.js'
import { OrthographicCamera } from './OrthographicCamera.js'

export const gl = document.querySelector('canvas').getContext('webgl2')

export class Renderer {
  static shader = new BaseShader()
  static camera = new OrthographicCamera()

  static Render() {
    //TODO: Remove the gl.clearColor
    gl.clearColor(0, 0, 0, 1)

    //Clearing
    GLClearScreen()

    //Render the scene
    this.shader.Use()

    this.shader.Mat4('uProjection', this.camera.Get32Projection())
  }

  static ResizeViewport(width, height) {
    gl.viewport(0, 0, width, height)
  }
}

function GLClearScreen() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR)
}

import { TextureManager } from '../../manager/TextureManager.js'
import { Renderer } from '../Renderer.js'
import { Texture } from '../webgl/Texture.js'
import { Color } from './Color.js'

const config = {
  color: '',
  textureName: '',
}

export class Material {
  /**
   * @param {config} config
   */
  constructor(config) {
    this.color = config.color || new Color()

    //Texturing
    this.textureName = config.textureName || undefined
    this.useTexture = false
    if (this.textureName) {
      this.useTexture = true
      this.texture = TextureManager.Get(this.textureName)
    }
  }

  SetTextureName(name) {
    this.textureName = name
    this.useTexture = true
    this.texture = TextureManager.Get(this.textureName)
  }

  Use() {
    const shader = Renderer.shader

    shader.Int('useTexture', 0)
    if (this.useTexture) {
      shader.Int('useTexture', 1)
      this.texture.Activate()
      shader.Int('uSampler', this.texture.unit)
    }

    shader.Vec4fv('uColor', this.color.To32Array())
  }
}

//TODO: Managers

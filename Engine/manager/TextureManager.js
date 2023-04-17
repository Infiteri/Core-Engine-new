import { Texture } from '../renderer/webgl/Texture.js'

export class TextureManager {
  static textures = {}

  /**
   * Adds a texture to the table
   *
   * @param {string} textureName The texture name to add under
   * @param {string} assetName The asset name
   * @returns {Texture}
   */
  static Add(textureName, assetName) {
    if (this.textures[textureName]) {
      return this.textures[textureName]
    }

    this.textures[textureName] = new Texture(assetName)
    return this.textures[textureName]
  }

  /**
   * @param {string} textureName
   * @returns {Texture}
   */
  static Get(textureName) {
    return this.textures[textureName] || null
  }
}

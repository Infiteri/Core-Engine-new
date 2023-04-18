import { AssetManager } from '../../assets/AssetManager.js'
import { Message } from '../../messages/Message.js'
import { MessageBus } from '../../messages/MessageBus.js'
import { gl } from '../Renderer.js'

export class Texture {
  static unit = -1

  constructor(assetName) {
    this.assetName = assetName
    this.handle = gl.createTexture()

    Texture.unit++
    this.unit = Texture.unit

    this.Bind()

    const asset = AssetManager.GetAsset(assetName)
    if (!asset) {
      this.LoadTextureWithoutAsset()
      MessageBus.AddSubscription(Message.assetLoaded + this.assetName, this)
    } else {
      this.LoadTextureWithAsset(asset)
    }

    this.Unbind()
  }

  OnMessage(message) {
    if (message.IsAssetLoaded(this.assetName)) {
      this.Bind()
      this.LoadTextureWithAsset(message.context)
      this.Unbind()
    }
  }

  LoadTextureWithoutAsset() {
    const rgba = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    const pixel = new Uint8Array([255, 255, 255, 255])
    gl.texImage2D(gl.TEXTURE_2D, 0, rgba, 1, 1, 0, rgba, srcType, pixel)
  }

  LoadTextureWithAsset(asset) {
    const rgba = gl.RGBA
    const type = gl.UNSIGNED_BYTE
    const { width, height } = asset

    gl.texImage2D(gl.TEXTURE_2D, 0, rgba, rgba, type, asset.data)

    //Update Texture size
    if (isPowerOf2(width) && isPowerOf2(height)) {
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  }

  Bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.handle)
  }

  Unbind() {
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  /**
   * Activates and binds the texture
   */
  Activate() {
    gl.activeTexture(gl.TEXTURE0 + this.unit)
    this.Bind()
  }
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0
}

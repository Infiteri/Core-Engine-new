import { Message } from '../messages/Message.js'
import { MessageBus } from '../messages/MessageBus.js'

//Assets | Image, JSON, Text
export class Asset {
  name
  data

  constructor(name, data) {
    this.name = name
    this.data = data
  }
}

//Asset loaders | Loads files with specific extension
export class AssetLoader {
  extensions = []

  LoadAsset(assetName) {}
}

//Image assets
class ImageAsset extends Asset {
  constructor(name, data) {
    super(name, data)
  }

  get width() {
    return this.data.width
  }

  get height() {
    return this.data.height
  }
}

class ImageAssetLoader extends AssetLoader {
  extensions = ['png', 'jpeg', 'gif']

  LoadAsset(assetName) {
    const image = new Image()

    image.onload = this.OnImageLoaded.bind(this, assetName, image)

    image.src = assetName
  }

  OnImageLoaded(assetName, image) {
    const asset = new ImageAsset(assetName, image)
    AssetManager.OnAssetLoaded(asset)
  }
}

//Manager
export class AssetManager {
  /** @type {AssetLoader[]} */
  static loaders = []

  /** @type {Object.<string, Asset>} */
  static loadedAssets = {}

  //Ready flag
  static _init = false

  static Init() {
    //DONE: Add main loaders
    this.RegisterLoader(new ImageAssetLoader())

    this._init = true
  }

  static RegisterLoader(loader) {
    if (!loader) return

    const index = this.loaders.indexOf(loader)
    if (index === -1) {
      this.loaders.push(loader)
    } else {
      console.warn(`Loader already exists`, loader)
      return
    }
  }

  static GetAsset(assetName) {
    if (this.loadedAssets[assetName]) {
      return this.loadedAssets[assetName]
    } else {
      this.LoadAsset(assetName)
    }
  }

  static LoadAsset(assetName) {
    const extension = assetName.split('.').pop().toLowerCase()

    for (const l of this.loaders) {
      const index = l.extensions.indexOf(extension)

      if (index === -1) {
        console.warn(`No loaders for extension ${extension}`)
      } else {
        l.LoadAsset(assetName)
      }
    }
  }

  static OnAssetLoaded(asset) {
    this.loadedAssets[asset.name] = asset

    const code = Message.assetLoaded + asset.name
    MessageBus.Send(code, this, asset, 'NORMAL')
  }
}

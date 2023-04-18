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

//JSON assets
class JSONAsset extends Asset {
  constructor(name, data) {
    super(name, data)
  }
}

class JSONAssetLoader extends AssetLoader {
  extensions = ['json']

  LoadAsset(assetName) {
    const request = new XMLHttpRequest()
    request.open('GET', assetName)
    request.addEventListener(
      'load',
      this.OnJSONLoaded.bind(this, assetName, request)
    )
    request.send()
  }

  OnJSONLoaded(assetName, request) {
    const json = JSON.parse(request.responseText)
    const asset = new JSONAsset(assetName, json)
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
    this.RegisterLoader(new JSONAssetLoader())

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

      if (index !== -1) {
        l.LoadAsset(assetName)
        return
      }
    }

    console.warn(`No loaders for ${extension}`)
  }

  static OnAssetLoaded(asset) {
    this.loadedAssets[asset.name] = asset

    const code = Message.assetLoaded + asset.name
    MessageBus.Send(code, this, asset, 'NORMAL')
  }

  static IsAssetLoaded(assetName) {
    return this.loadedAssets[assetName] !== undefined
  }
}

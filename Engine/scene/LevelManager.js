import { Asset, AssetManager } from '../assets/AssetManager.js'
import { Message } from '../messages/Message.js'
import { MessageBus } from '../messages/MessageBus.js'
import { Level } from './Level.js'

export class LevelManager {
  /** @type {Object.<id, Level>} */
  static levels = {}

  /** @type {Level} */
  static activeLevel = null

  /**
   * Adds a new level JSON to the list of levels
   *
   * @param {Level} level The path of the level to add
   */
  static Add(level) {
    this.levels[level.name] = level
  }

  static Render() {
    if (this.activeLevel === null) return
    this.activeLevel.Render()
  }

  static Update() {
    if (this.activeLevel === null) return
    this.activeLevel.Update()
  }

  static StartLevel(name) {
    const l = this.levels[name]

    if (!l) return

    if (this.activeLevel) {
      this.activeLevel.OnStop()
    }

    this.activeLevel = l
    this.activeLevel.OnStart()
    this.activeLevel.Init()
  }
}

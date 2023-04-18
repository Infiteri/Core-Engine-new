import { BaseScript } from './BaseScript.js'

export class ScriptManager {
  /** @type {Object.<string, BaseScript>} */
  static scripts = {}

  static Add(name, instance) {
    if (this.scripts[name] === undefined) this.scripts[name] = instance
  }

  static Get(name) {
    return this.scripts[name] || null
  }
}

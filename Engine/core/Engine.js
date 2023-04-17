import { AssetManager } from '../assets/AssetManager.js'
import { MessageBus } from '../messages/MessageBus.js'
import { Application } from './Application.js'
import { Input } from './Input.js'
import { Logger } from './Logger.js'

/**
 * Static class
 *
 * The core engine
 */
export class Engine {
  /** @type {Application} */
  static application = null

  /**
   * @private
   *
   * Is running or not
   */
  static _isRunning = false

  /**
   * Delta time in seconds since the last update call
   */
  static delta = 0

  /** @private */
  static _previousTime = 0

  /**
   * Virtual function to be re-written by the USER which returns the user application
   */
  static CreateApplication() {}

  static Start() {
    this.application = this.CreateApplication()

    if (this.application instanceof Application) {
      this._isRunning = true
    } else {
      //Stop subsystems
      this._isRunning = false
      Input.Destroy()

      //Crash
      Logger.Fatal(`Application not instance of Application`)
    }

    this.Preload()
  }

  /**
   * @private
   * Sets up everything and runs once ready
   */
  static Preload() {
    //Start subsystems
    if (!Input._init) {
      Input.Init()
      this.CallOnNextFrame(this.Preload.bind(this))
      return
    }

    if (!Logger._init) {
      Logger.Init()
      this.CallOnNextFrame(this.Preload.bind(this))
      return
    }

    if (!AssetManager._init) {
      AssetManager.Init()
      this.CallOnNextFrame(this.Preload.bind(this))
      return
    }

    this.application.PreUpdate()
    this.application.Init()

    this.Update()
  }

  /**
   * Updates everything
   */
  static Update() {
    if (!this._isRunning) return

    //Calculate delta time
    this.delta = (performance.now() - this._previousTime) / 1000
    this._previousTime = performance.now()

    //Update subsystems
    MessageBus.Update()

    //Run app
    this.application.Run()

    requestAnimationFrame(this.Update.bind(this))
  }

  // Utils
  /**
   * Returns the delta time in seconds since the last update call
   *
   * @returns {number} The delta
   */
  static GetDeltaTime() {
    return this.delta
  }

  /**
   * Calls a function on the next available frame
   *
   * @param {Function} callback The callback to call on the next available frame
   */
  static CallOnNextFrame(callback = () => {}) {
    setTimeout(() => {
      callback()
    }, 0)
  }
}

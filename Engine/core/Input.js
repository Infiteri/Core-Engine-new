/**
 * Input system
 */
export class Input {
  /** @private */
  static _init = false

  /**
   *  @private
   * @type {Object.<string, boolean>}
   */
  static keys = {}

  /**
   * Initialized by the engine as a subsystem
   */
  static Init() {
    //Keyboard
    addEventListener('keydown', event => {
      this.keys[event.key] = true
      this.keys[event.code] = true
    })

    addEventListener('keyup', event => {
      this.keys[event.key] = false
      this.keys[event.key] = undefined
      delete this.keys[event.key]

      this.keys[event.code] = false
      this.keys[event.code] = undefined
      delete this.keys[event.code]
    })

    //Mouse

    this._init = true
  }

  static Destroy() {
    removeEventListener('keydown')
    removeEventListener('keyup')
  }

  // Keyboard side of the system

  /**
   * @param {string} key The key to check for
   * @returns {boolean} True if pressed
   */
  static GetKey(key) {
    return this.keys[key] || false
  }

  /**
   * NOTE That this returns if the CODE (KeyA, KeyB, KeyD) is pressed and don't confuse it for the keyCode (56, 57, 58, ... .)
   *
   * @param {string} code The code to check for
   * @returns {boolean} True if pressed
   */
  static GetCode(code) {
    return this.keys[code] || false
  }
}

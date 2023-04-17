/**
 * Started by Engine
 */
export class Logger {
  static _init = false

  /**
   * Called by the engine
   */
  static Init() {
    this._init = true
  }

  static Log(message = ``) {
    console.log(message)
  }

  static Warn(message = ``) {
    console.warn(message)
  }

  static Error(message = ``) {
    console.error(message)
  }

  static Fatal(message = ``) {
    throw new Error(message)
  }

  static Assert(condition = false, message) {
    console.assert(condition, message)
  }

  static Trace() {
    console.trace()
  }
}

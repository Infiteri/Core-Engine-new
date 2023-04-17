/** @typedef {'NORMAL' | 'HIGH'} */
export let PriorityTypes

export class Message {
  static assetLoaded = 'MESSAGE_ASSET_LOADED::'

  /**
   * @param {string} code
   * @param {any} sender
   * @param {any} context
   * @param {PriorityTypes} priority
   */
  constructor(code, sender, context, priority = 'NORMAL') {
    this.code = code
    this.sender = sender
    this.context = context
    this.priority = priority
  }

  /**
   * Checks if the this.code matches with the passed in code
   *
   * @param {string} code The code to check
   * @returns {boolean}
   */
  Is(code) {
    return this.code === code
  }

  /**
   * Checks if the this.code matches with Message.assetLoaded + code
   *
   * @param {string} code The code to check
   * @returns {boolean}
   */
  IsAssetLoaded(code) {
    return this.code === Message.assetLoaded + code
  }
}

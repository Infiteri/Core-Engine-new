import { Message, PriorityTypes } from './Message.js'

export class MessageHandler {
  OnMessage(message) {}
}

export class MessageBus {
  /** @type {MessageHandler[]} */
  static handlers = []

  /** @type {Message[]} */
  static normalMessageQueue = []

  /**
   * Defines the amount of messages that will be sent every frame
   */
  static messagesSentPerUpdate = 100

  static AddHandler(handler) {
    this.handlers.push(handler)
  }

  /**
   * Queues up a new message to the list if of normal priority, if high gets sent instantly
   *
   * @param {string} code The message code
   * @param {any} sender The message sender
   * @param {any} context The context of the message (extra data)
   * @param {PriorityTypes} priority The importance
   */
  static Send(code, sender = {}, context = {}, priority = 'NORMAL') {
    const message = new Message(code, sender, context, priority)

    if (priority === 'HIGH') {
      for (let i = 0; i < this.handlers.length; i++) {
        const handler = this.handlers[i]
        handler.OnMessage(message)
      }
    } else {
      this.normalMessageQueue.push(message)
    }
  }

  static Update() {
    if (this.normalMessageQueue.length === 0 || this.handlers.length === 0)
      return

    const length = Math.min(
      this.normalMessageQueue.length,
      this.messagesSentPerUpdate
    )

    for (let i = 0; i < length; i++) {
      const message = this.normalMessageQueue.pop()

      for (let i = 0; i < this.handlers.length; i++) {
        const handler = this.handlers[i]
        handler.OnMessage(message)
      }
    }
  }
}

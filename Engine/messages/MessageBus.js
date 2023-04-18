import { Message, PriorityTypes } from './Message.js'

class MessageSubscriptionNode {
  /**
   *
   * @param {Message} message
   * @param {MessageHandler} handler
   */
  constructor(message, handler) {
    this.message = message
    this.handler = handler
  }
}

export class MessageHandler {
  OnMessage(message) {}
}

export class MessageBus {
  /** @type {Object.<string, MessageHandler[]>} */
  static subscriptions = {}

  /** @type {MessageSubscriptionNode[]} */
  static normalMessageQueue = []

  /**
   * Defines the amount of messages that will be sent every frame
   */
  static messagesSentPerUpdate = 100

  static AddSubscription(code, handler) {
    if (!this.subscriptions[code]) {
      this.subscriptions[code] = []
    }

    if (this.subscriptions[code].indexOf(handler) === -1) {
      this.subscriptions[code].push(handler)
      return
    }
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

    const handlers = this.subscriptions[code]

    if (!handlers || handlers.length === 0) return

    for (const h of handlers) {
      if (priority === 'HIGH') {
        h.OnMessage(message)
      } else {
        this.normalMessageQueue.push(new MessageSubscriptionNode(message, h))
      }
    }
  }

  static Update() {
    if (this.normalMessageQueue.length === 0) return

    const length = Math.min(
      this.normalMessageQueue.length,
      this.messagesSentPerUpdate
    )

    for (let i = 0; i < length; i++) {
      const node = this.normalMessageQueue.pop()

      node.handler.OnMessage(node.message)
    }
  }
}

import { MessageBus } from '../messages/MessageBus.js'
import { Renderer } from '../renderer/Renderer.js'
import { Engine } from './Engine.js'
import { Window } from './Window.js'

/**
 * User application Blueprint
 */
export class Application {
  constructor() {
    new Window() //Auto window setup / resizing and canvas state

    MessageBus.AddHandler(this)
  }

  OnMessage(message) {}

  OnPreUpdate() {}

  /**
   * Gets called before the engine main loop begins
   *
   * Do not re-write
   */
  PreUpdate() {
    this.OnPreUpdate()
  }

  /**
   * Do not re-write
   */
  Init() {
    this.OnInit()
  }

  /**
   * Do not re-write
   */
  Render() {
    Renderer.Render()

    this.OnRender(Engine.GetDeltaTime())
  }

  /**
   * Do not re-write
   */
  Update() {
    this.OnUpdate(Engine.GetDeltaTime())
  }

  /**
   * Gets called in the Init function
   */
  OnInit() {}

  /**
   * Gets called in the Render function
   */
  OnRender() {}

  /**
   * Gets called in the Update function
   */
  OnUpdate() {}

  /**
   * Renders and updates once (looping done by the engine)
   *
   * Calls the render and update calls
   */
  Run() {
    this.Render()
    this.Update()
  }
}

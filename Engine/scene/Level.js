import { GameObject } from './GameObject.js'
import { Scene } from './Scene.js'
import { Component } from './components/Component.js'

export class Level {
  static id = -1

  constructor(name = 'Level') {
    //? Level id setup
    Level.id++
    this.id = Level.id

    this.name = name

    this.scene = new Scene()
  }

  OnStart() {}

  OnStop() {}

  OnInit() {}

  OnRender() {}

  OnUpdate() {}

  /**
   * Finds a component in the component tree list
   *
   * @param {string} name The name to search for
   * @returns {Component | null} Null if not found, Component if found (returns the first one)
   */
  GetComponentByName(name) {
    return this.scene.GetComponentByName(name)
  }

  /**
   * Finds a children in the children tree list
   *
   * @param {string} name The name to search for
   * @returns {GameObject | null} Null if not found, GameObject if found (returns the first one)
   */
  GetChildByName(name) {
    return this.scene.GetChildByName(name)
  }

  /**
   * Adds a new game object to this game object children list (Array)
   *
   * @param {GameObject} child
   */
  AddChild(child) {
    this.scene.AddChild(child)
  }

  /**
   * Adds a component to this game object components list (Array)
   *
   * @param {Component} component
   */
  AddComponent(child) {
    this.scene.AddComponent(child)
  }

  /**
   * Initializes the child as well as it's children
   */
  Init() {
    this.scene.Init()
    this.OnInit()
  }

  /**
   * Renders the child as well as it's children
   */
  Render() {
    this.scene.Render()
    this.OnRender()
  }

  /**
   * Updates the child as well as it's children
   */
  Update() {
    this.scene.Update()
    this.OnUpdate()
  }
}

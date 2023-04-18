import { GameObject } from './GameObject.js'
import { Component } from './components/Component.js'

export class Scene {
  static id = -1

  constructor() {
    //? Scene id setup
    Scene.id++
    this.id = Scene.id

    this.root = new GameObject('__SCENE__ROOT__')
  }

  /**
   * Finds a children in the children tree list
   *
   * @param {string} name The name to search for
   * @returns {GameObject | null} Null if not found, GameObject if found (returns the first one)
   */
  GetChildByName(name) {
    return this.root.GetChildByName(name)
  }

  /**
   * Finds a component in the component tree list
   *
   * @param {string} name The name to search for
   * @returns {Component | null} Null if not found, Component if found (returns the first one)
   */
  GetComponentByName(name) {
    return this.root.GetComponentByName(name)
  }

  /**
   * Adds a new game object to this game object children list (Array)
   *
   * @param {GameObject} child
   */
  AddChild(child) {
    this.root.AddChild(child)
  }

  /**
   * Adds a component to this game object components list (Array)
   *
   * @param {Component} component
   */
  AddComponent(child) {
    this.root.AddComponent(child)
  }

  /**
   * Initializes the child as well as it's children
   */
  Init() {
    this.root.Init()
  }

  /**
   * Renders the child as well as it's children
   */
  Render() {
    this.root.Render()
  }

  /**
   * Updates the child as well as it's children
   */
  Update() {
    this.root.Update()
  }
}

import { Matrix4x4 } from '../math/Matrix4x4.js'
import { Transform } from '../math/Transform.js'
import { BaseScript } from '../script/BaseScript.js'
import { ScriptManager } from '../script/ScriptManager.js'
import { Component } from './components/Component.js'

/**
 * Main building blocks
 */
export class GameObject {
  static id = -1

  /** @private @type {GameObject} */
  _parent = null

  /** @type {GameObject[]} */
  _children = []

  /** @type {Component[]} */
  _components = []

  /** @type {BaseScript[]} */
  _scripts = []

  /** @private */
  _isLoaded = false

  /** @private The matrix relative to the transform*/
  _localMatrix = Matrix4x4.Identity()

  /** @private The position in the world */
  _worldMatrix = Matrix4x4.Identity()

  transform = new Transform()

  constructor(name = 'GameObject') {
    //? Setup id
    GameObject.id++
    this.id = GameObject.id

    this.name = name
  }

  /**
   * Finds a component in the component tree list
   *
   * @param {string} name The name to search for
   * @returns {Component | null} Null if not found, Component if found (returns the first one)
   */
  GetComponentByName(name) {
    for (const c of this._components) {
      if (c.name === name) return c
    }

    for (const c of this._children) {
      let result = c.GetComponentByName(name)

      if (result) return result
    }

    return null
  }

  /**
   * Finds a children in the children tree list
   *
   * @param {string} name The name to search for
   * @returns {GameObject | null} Null if not found, GameObject if found (returns the first one)
   */
  GetChildByName(name) {
    if (this.name === name) return this

    for (const c of this._children) {
      let result = c.GetChildByName(name)

      if (result) return result
    }

    return null
  }

  /**
   * Returns the parent or null (null might be because it might be the scene root game object)
   *
   * @returns {GameObject} The parent
   */
  GetParent() {
    return this._parent || null
  }

  /**
   * Adds a new game object to this game object children list (Array)
   *
   * @param {GameObject} child
   */
  AddChild(child) {
    child._parent = this

    //If this is already initialized, calls the child.Init method
    if (this._isLoaded) child.Init()

    this._children.push(child)
  }

  /**
   * Adds a component to this game object components list (Array)
   *
   * @param {Component} component
   */
  AddComponent(component) {
    component.parent = this

    //If this is already initialized, calls the child.Init method
    component.Init()

    this._components.push(component)
  }

  /**
   * Adds a new script from the script manager
   *
   * @param {string} scriptName The name the script is registered under
   */
  AddScript(scriptName) {
    const s = ScriptManager.Get(scriptName)

    if (s === null) {
      console.warn(`Cant add script ${scriptName}, null`)
      return
    }

    s.parent = this
    if (this._isLoaded) s.OnInit()
    this._scripts.push(s)
  }

  /**
   * Initializes the child as well as it's children
   */
  Init() {
    //Recursive
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i]
      child.Init()
    }

    for (let i = 0; i < this._components.length; i++) {
      const component = this._components[i]
      component.Init()
    }

    for (let i = 0; i < this._scripts.length; i++) {
      const script = this._scripts[i]
      script.Init()
    }

    this._isLoaded = true
  }

  /**
   * Renders the child as well as it's children
   */
  Render() {
    if (!this._isLoaded) return

    //Recursive
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i]
      child.Render()
    }

    for (let i = 0; i < this._components.length; i++) {
      const component = this._components[i]
      component.Render()
    }
  }

  /**
   * Updates the child as well as it's children
   */
  Update() {
    if (!this._isLoaded) return

    this.UpdateWorldMatrix()

    //Recursive
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i]
      child.Update()
    }

    for (let i = 0; i < this._scripts.length; i++) {
      const scripts = this._scripts[i]
      scripts.OnUpdate()
    }
  }

  UpdateWorldMatrix() {
    //Update the local matrix based on the transform
    this._localMatrix = this.transform.GetMatrix()

    const parentMatrix = this._parent ? this._parent._worldMatrix : undefined

    if (parentMatrix) {
      this._worldMatrix = Matrix4x4.Multiply(parentMatrix, this._localMatrix)
    } else {
      this._worldMatrix.CopyFrom(this._localMatrix)
    }
  }
}

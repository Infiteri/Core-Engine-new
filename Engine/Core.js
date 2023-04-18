import { AssetManager } from './assets/AssetManager.js'
import { Application } from './core/Application.js'
import { Engine } from './core/Engine.js'
import { Input } from './core/Input.js'
import { Logger } from './core/Logger.js'
import { Sprite } from './graphics/Sprite.js'
import { Square } from './graphics/Square.js'
import { MaterialManager } from './manager/MaterialManager.js'
import { TextureManager } from './manager/TextureManager.js'
import { Matrix4x4 } from './math/Matrix4x4.js'
import { Vector3 } from './math/Vector3.js'
import { MessageBus, MessageHandler } from './messages/MessageBus.js'
import { Renderer } from './renderer/Renderer.js'
import { Color } from './renderer/extras/Color.js'
import { Material } from './renderer/extras/Material.js'
import { Buffer } from './renderer/webgl/Buffer.js'
import { GameObject } from './scene/GameObject.js'
import { Level } from './scene/Level.js'
import { LevelManager } from './scene/LevelManager.js'
import { SpriteComponent } from './scene/components/SpriteComponent.js'
import { SquareComponent } from './scene/components/SquareComponent.js'
import { ScriptManager } from './script/ScriptManager.js'

/**
 * House for imports
 */
const Core = {
  //? CORE ---------------

  Engine,
  Application,
  Input,
  Logger,
  MessageBus,
  MessageHandler,

  //? --------------------

  //? ASSETS -------------

  AssetManager,
  TextureManager,
  MaterialManager,

  //? --------------------

  //? RENDER -------------
  Renderer,
  Buffer,
  //? --------------------

  //? MATH ---------------
  Matrix4x4,
  Vector3,
  //? --------------------

  //? GRAPHICS -----------

  Color,
  Material,

  Square,
  Sprite,
  //? --------------------

  //? WORLD --------------
  GameObject,
  Level,
  LevelManager,
  //? --------------------

  ScriptManager,

  //Comps
  SquareComponent,
  SpriteComponent,
}

export default Core

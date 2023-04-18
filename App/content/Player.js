import Core from '../../Engine/Core.js'
import { GameObject } from '../../Engine/scene/GameObject.js'
import { playerScriptName } from './PlayerScript.js'

export class Player extends GameObject {
  constructor() {
    super('Player')

    this.transform.position.x = 100
    this.transform.position.y = 100

    this.AddComponent(
      new Core.SquareComponent('Square', 'sprite_material', 100, 100)
    )
  }

  Init() {
    super.Init()

    this.AddScript(playerScriptName)
  }
}

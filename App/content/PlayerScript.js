import { BaseScript } from '../../Engine/script/BaseScript.js'
import { ScriptManager } from '../../Engine/script/ScriptManager.js'

export const playerScriptName = 'PlayerScript'

class PlayerScript extends BaseScript {
  OnUpdate() {
    
  }
}

ScriptManager.Add('PlayerScript', new PlayerScript())

import Core from '../Engine/Core.js'
import { MainLevel } from './content/MainLevel.js'

class Sandbox extends Core.Application {
  OnInit() {
    //Load resources
    const material = new Core.Material({})
    Core.MaterialManager.Add('sprite_material', material)

    Core.LevelManager.Add(new MainLevel('Main Level'))
    Core.LevelManager.StartLevel('Main Level')
  }
}

// Returns the new sandbox application
Core.Engine.CreateApplication = () => {
  return new Sandbox()
}

// Creates the new sandbox application and runs
Core.Engine.Start()

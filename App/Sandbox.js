import Core from '../Engine/Core.js'

class Sandbox extends Core.Application {
  OnInit() {
    Core.TextureManager.Add('crate', '/crate.png')
    const material = new Core.Material({
      color: new Core.Color(0, 125, 255, 255),
      textureName: 'crate',
    })
    Core.MaterialManager.Add('sprite_material', material)

    this.sprite = new Core.Sprite('sprite_material', 100, 100)
    this.sprite.material.color = new Core.Color(0, 125, 255, 255)
  }

  OnMessage(message) {}

  OnRender(delta) {
    this.sprite.Render()
  }

  OnUpdate(delta) {
    if (Core.Input.GetCode('KeyA')) {
      this.sprite.position.x -= 500 * delta
    }

    if (Core.Input.GetCode('KeyD')) {
      this.sprite.position.x += 500 * delta
    }

    if (Core.Input.GetCode('KeyW')) {
      this.sprite.position.y -= 500 * delta
    }

    if (Core.Input.GetCode('KeyS')) {
      this.sprite.position.y += 500 * delta
    }
  }
}

// Returns the new sandbox application
Core.Engine.CreateApplication = () => {
  return new Sandbox()
}

// Creates the new sandbox application and runs
Core.Engine.Start()

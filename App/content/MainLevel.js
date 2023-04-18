import { Level } from '../../Engine/scene/Level.js'
import { Player } from './Player.js'

export class MainLevel extends Level {
  OnInit() {
    this.player = new Player()
    this.AddChild(this.player)
  }
}

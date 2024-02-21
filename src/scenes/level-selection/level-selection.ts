import {Actor, Color, Engine, ImageSource, Scene, SceneActivationContext, vec} from "excalibur";
import {Resources} from "@/resources";
import axios from "axios";

export class LevelSelection extends Scene {
  // Hold a reference globally to our UI container
  // This would probably be encapsulated in a UIManager module
  private ui : HTMLElement = document.getElementById('ui')
  options:string[] = ['1', '2', '3' ,'4', '5']
  private backgroundImage : Actor;
  private playerName : string;
  private gameMode: HTMLHeadingElement;

  onInitialize(engine:Engine) {
    this.backgroundColor = Color.Black
    this.backgroundImage = new Actor({width:Resources.BackGround3.width, height:Resources.BackGround3.height})
    this.backgroundImage.graphics.use(Resources.BackGround3.toSprite());
    this.backgroundImage.scale = vec(0.70, 0.70)
    // this.backgroundImage.scale = vec(engine.canvasWidth/Resources.BackGround2.width, engine.canvasHeight/Resources.BackGround2.height);
    this.backgroundImage.pos = engine.screen.center;
    this.add(this.backgroundImage);

    this.gameMode = document.createElement('h1');
    this.gameMode.textContent = 'PRACTICE AI';
    this.ui.appendChild(this.gameMode);
    // Add a CSS class to `ui` that helps indicate which scene is being displayed

  }


  onActivate(context: SceneActivationContext<unknown>) {
    this.ui.classList.add('LevelSelection')
    let playerLabel = document.createElement("h3");

    axios.get("http://127.0.0.1:3000/auth/player-name").then(res => {
      return res.data.playerName
    }).then((playerName) => {
      console.log(playerName)
      this.playerName = playerName

    }).catch(e =>  console.log(e))

    this.ui.appendChild(playerLabel);
    for (let i = 0; i < this.options.length; i++) {
      this.ui.appendChild(this.createButtonElement(this.options[i], 'practice0'))
    }
  }

  onDeactivate() {
    // Ensure we clean-up the DOM and remove any children when transitioning scenes
    this.ui.classList.remove('LevelSelection')
    this.ui.innerHTML = ''
  }

  private createButtonElement(text:string, scene:string) {
    const btn = document.createElement('level_button')
    btn.innerText = text
    btn.className = 'level__button'
    btn.onclick = (e) => {
      e.preventDefault()
      this.engine.goToScene(scene)
    }
    return btn
  }

  onPostUpdate(engine: Engine, delta: number) {
    let playerLabel = document.createElement("h3");
    playerLabel.innerHTML = `Hello, ${this.playerName}!`;
  }


}

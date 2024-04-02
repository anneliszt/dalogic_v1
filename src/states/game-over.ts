import {GameState} from "@/components/game-state";
import type {Engine} from "excalibur";
import {state} from "@/store/store";
import {Color, Font, Label, TextAlign} from "excalibur";


export class GameOver extends GameState{
  static stateName = "gameOver";

  constructor() {
    super();
    this.stateName = GameOver.stateName;
  }

  onEnter(engine: Engine){
    console.log("Game Over")
    engine.goToScene("gameOverScreen", {gameMode: state.gameMode});
  }
}
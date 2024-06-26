import {GameState} from "@/components/game-state";
import type {Engine} from "excalibur";
import {GameMode, state} from "@/store/store";
import type {Player} from "@/actors/player/player";
import {AiPlayer} from "@/actors/ai/ai-player";
import {PlayerTurn} from "@/states/player-turn";
import {AiTurn} from "@/states/ai-turn";

export class SwitchingTurn extends GameState{
  static stateName = "switchingTurn";

  constructor() {
    super();
    this.stateName = SwitchingTurn.stateName;

  }


  onUpdate(engine:Engine, delta:number) {
    const players = [state.player, state.opponent];

    const prevPlayer : Player = players.find((p:Player) => p.playerID === state.currentPlayerID )

    const nextPlayer : Player = players.find((p:Player) => p.playerID !== state.currentPlayerID )
    state.currentPlayerID = nextPlayer.playerID;

    dispatchEvent(new CustomEvent("score1",{detail:state.player.score.toString()} ));
    dispatchEvent(new CustomEvent("score2",{detail:state.opponent.score.toString()} ));
    dispatchEvent(new CustomEvent("turn", {detail:(state.currentPlayerID === state.player.playerID)}));

    switch (state.gameMode){
      case GameMode.AIVsPlayer:
        if (prevPlayer instanceof AiPlayer){
          this.nextState = PlayerTurn.stateName;
        }else {
          this.nextState = AiTurn.stateName;
        }
        break;
      case GameMode.AIvsAI:
        this.nextState = AiTurn.stateName;
        break;
      case GameMode.PlayerVsPlayer:
        this.nextState = PlayerTurn.stateName;
        break;
    }
  }


}
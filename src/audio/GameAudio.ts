import type {Sound} from "excalibur";
import {Resources} from "@/resources";

export enum AudioType{
  SELECT,
  SCORE,
  BG
}
export class GameAudio{

  static _instance : GameAudio = null;

  private selectSounds : Sound[] = [Resources.Select1, Resources.Select2];
  private scoreSounds : Sound[] = [Resources.Score1, Resources.Score2, Resources.Score3];
  private bgMusic : Sound = Resources.BGMusic

  constructor() {
    if (GameAudio._instance!== null){
      return GameAudio._instance;
    }

    GameAudio._instance = this;

  }

  public async play(type: AudioType, volume : number = 0.6, loop : boolean = false){
    let audio:Sound;
    switch (type){
      case AudioType.SELECT:
        audio = this.selectSounds[Math.floor(Math.random()*this.selectSounds.length)];
        break;
      case AudioType.SCORE:
        audio = this.scoreSounds[Math.floor(Math.random()*this.selectSounds.length)];
        break;
      case AudioType.BG:
        audio = this.bgMusic;
        break


    }

    audio.loop = loop;
    await audio.play(volume);
  }
}
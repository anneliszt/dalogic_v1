import { Actor, Color, vec } from 'excalibur';
import { Resources } from '@/resources';
import {transform} from "terser-webpack-plugin/types/minify";

export class Player extends Actor {
  constructor() {
    super({
      color: new Color(255, 255, 255)
    });
  }


  onInitialize() {
    this.graphics.use(Resources.Piece.toSprite());
    this.pos = vec(0,0)
  }


}

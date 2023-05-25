import { Player } from "../Player/Player";

export class Game {
   private gameId:string
   private players:Player [] = []

   public constructor(host: Player) {
    this.gameId = "DF6354"
    this.players.push(host)
    
   }

   getGameId () {
    return this.gameId
   }
}
import { Player } from "../Player/Player";
import { playerStatus, playerOrNull, players } from "../Player/models";


export class Game {
   private gameId:string
   private players:Player [] = []

   public constructor(id : string, host: Player) {
    this.gameId = id
    this.players.push(host)
    
   }

   getGameId () {
    return this.gameId
   }

   getPlayers (): Player [] {
    return this.players
   }

   getPlayersStatus () : playerStatus [] {
      return this.players.map(p => {
         return {pseudo : p.getPseudo(), status : p.getStatus()}
      })
   }

   getPlayer (playerId :string) : playerOrNull{
      return this.players.find(p => p.getId() === playerId)
   }

   addPlayer (player: Player) {
    this.players.push(player)
   }

   broadcastPlayers = (event: players) => {
    this.players &&
    this.players.forEach(p =>
      p.getSocket()?.send(JSON.stringify(event))
    );
  };

  EventStartGame = (event: players) => {
   this.players &&
   this.players.forEach(p =>
     p.getSocket()?.send(JSON.stringify(event.data))
   );
 };
}
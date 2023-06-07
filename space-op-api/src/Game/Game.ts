import { Player } from "../Player/Player";
import { playerStatus, playerOrNull, players } from "../Player/models";
import { gameStartEvent, operationEvent } from "../Events/models";
import { InstructorOperator } from "../Round/Round";
import { missionControl, newMissionControl } from "./models";


export class Game {
   private gameId:string
   private players:Player [] = []
   private integrity : number
   private turn : number 
   private missionsControl : missionControl []

   public constructor(id : string) {
    this.gameId = id
    this.integrity = 100
    this.turn = 1
    this.missionsControl = []
   }

   resetMissionControl(){
      this.missionsControl = []
   }

   getMissionControl() : missionControl [] {
      return this.missionsControl
   }

   addMissionControl (missionControll : missionControl) : void {
      if(this.missionsControl){
         this.missionsControl.push(missionControll)
      }
   }

   getIntegrity () : number {
      return this.integrity
   }

   setIntegrity (newIntegrity : number) {
      this.integrity = newIntegrity
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

   isPlayerById(id : string) : boolean {
      return this.players.findIndex((p : Player) => p.getId() === id) != -1
   }

   sendOperations (operations : InstructorOperator []) {
      this.resetMissionControl()

      operations.map((o : InstructorOperator) => {

         const operatorPlayer = this.getPlayers().find((p : Player) => p.getId() === o.operator.playerId)
         const instructorPlayer = this.getPlayers().find((p : Player) => p.getId() === o.instructor.playerId)
         const missionControl =  newMissionControl(false, o, false)

         if(operatorPlayer?.getSocket()?.OPEN === 1 && instructorPlayer?.getSocket()?.OPEN === 1){
            this.addMissionControl(missionControl)
            this.broadcastOperation({
               type: "operation",
               data: {
                  turn: this.turn,
                  role: o.operator.role,
                  id: o.code,
                  duration: 12,
                  operation : o.operation()
               }
            }, operatorPlayer)

            this.broadcastOperation({
               type: "operation",
               data: {
                  turn: this.turn,
                  role: o.instructor.role,
                  id: o.code,
                  duration: 12,
                  operation : o.operation()
               }
            }, operatorPlayer)
         } else {

            this.broadcastPlayers({
               type : "players",
               data: {
                  players : this.getPlayersStatus()
               }
            })
         }
      })
   }

   broadcastOperation = (event: operationEvent, player : Player) => { 
      player.getSocket()?.send(JSON.stringify(event))
   }

   broadcastPlayers = (event: players) => {
    this.players &&
    this.players.forEach(p =>
      p.getSocket()?.send(JSON.stringify(event))
    );
  };

   EventStartGame = (event: gameStartEvent) => {
      this.players &&
      this.players.forEach(p =>
      p.getSocket()?.send(JSON.stringify(event))
      );
   };
}
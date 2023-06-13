import { Player } from "../Player/Player";
import { playerStatus, playerOrNull, players } from "../Player/models";
import { gameStartEvent, operationEvent } from "../Events/models";
import { InstructorOperator } from "../Round/Round";
import { gameStatus, missionControl, newMissionControl, EventIntegrity } from "./models";
import { Round } from "../Round/Round";


export class Game {
   private gameId: string
   private players: Player[] = []
   private integrity: number
   private turn: number
   private missionsControl: missionControl[]
   private round: Round | undefined

   public constructor(id: string) {
      this.gameId = id
      this.integrity = 100
      this.turn = 1
      this.missionsControl = []
      this.round = undefined
   }

   passTurn(){
      this.turn += 1
   }

   setNewRound() {
      this.round = new Round(this.turn, this.players)
   }

   getRound() {
      return this.round
   }

   resetMissionControl() {
      this.missionsControl = []
   }

   getMissionControl(): missionControl[] {
      return this.missionsControl
   }

   addMissionControl(missionControll: missionControl): void {
      if (this.missionsControl) {
         this.missionsControl.push(missionControll)
      }
   }

   getIntegrity(): number {
      return this.integrity
   }

   setIntegrity(newIntegrity: number) {
      if (newIntegrity <= 100) {
         this.integrity = newIntegrity
      }
      else {
         this.integrity = 100
      }
   }

   getGameId() {
      return this.gameId
   }

   getPlayers(): Player[] {
      return this.players
   }

   getPlayersStatus(): playerStatus[] {
      return this.players.map(p => {
         return { pseudo: p.getPseudo(), status: p.getStatus() }
      })
   }

   getPlayer(playerId: string): playerOrNull {
      return this.players.find(p => p.getId() === playerId)
   }

   addPlayer(player: Player) {
      this.players.push(player)
   }

   isPlayerById(id: string): boolean {
      return this.players.findIndex((p: Player) => p.getId() === id) != -1
   }

   startRound() {
      this.setNewRound()
      const operations: InstructorOperator[] | undefined = this.getRound()?.chooseChosenOperations()
      if (operations) {
         this.sendOperations(operations)
      }
   }

   unReadyPlayer() {
      this.getPlayers().map(p => p.setStatus(false))
   }

   finishRound() {
      if (this.turn < 20 && this.integrity > 0) {
         this.passTurn()
         this.startRound()
      }
      else if (this.integrity <= 0) {
         this.broadcastGameEnd({
            type: "destroyed",
            data: {
               turns: this.turn
            }
         })
      }
      else {
         this.broadcastGameEnd({
            type: "victory",
            data: {}
         })
      }
   }

   isTurnOver() {
      return this.missionsControl.filter((mc: missionControl) => mc.isFinishedReceived != true).length === 0
   }

   sendOperations(operations: InstructorOperator[]) {
      this.resetMissionControl()

      operations.map((o: InstructorOperator) => {

         const operatorPlayer = this.getPlayers().find((p: Player) => p.getId() === o.operator.playerId)
         const instructorPlayer = this.getPlayers().find((p: Player) => p.getId() === o.instructor.playerId)
         const missionControl = newMissionControl(false, o, false)
         const roundTimer = this.getRound()?.getRoundTime()
         if (operatorPlayer?.getSocket()?.OPEN === 1 && instructorPlayer?.getSocket()?.OPEN === 1 && roundTimer) {
            this.addMissionControl(missionControl)
            this.sendEventOperation({
               type: "operation",
               data: {
                  turn: this.turn,
                  role: o.operator.role,
                  id: o.code,
                  duration: roundTimer,
                  operation: o.operation()
               }
            }, operatorPlayer)

            this.sendEventOperation({
               type: "operation",
               data: {
                  turn: this.turn,
                  role: o.instructor.role,
                  id: o.code,
                  duration: roundTimer,
                  operation: o.operation()
               }
            }, instructorPlayer)
         } else {
            this.broadcastPlayers({
               type: "players",
               data: {
                  players: this.getPlayersStatus()
               }
            })
         }
      })
   }

   sendEventOperation = (event: operationEvent, player: Player) => {
      player.getSocket()?.send(JSON.stringify(event))
   }

   broadcastPlayers = (event: players) => {
      this.players &&
         this.players.forEach(p =>
            p.getSocket()?.send(JSON.stringify(event))
         );
   };

   broadcastGameEnd = (event: gameStatus) => {
      this.players &&
         this.players.forEach(p =>
            p.getSocket()?.send(JSON.stringify(event))
         )
   }

   broadcastIntegrity = (event: EventIntegrity) => {
      this.players &&
         this.players.forEach(p =>
            p.getSocket()?.send(JSON.stringify(event))
         );
   }

   EventStartGame = (event: gameStartEvent) => {
      this.players &&
         this.players.forEach(p =>
            p.getSocket()?.send(JSON.stringify(event))
         );
   };
}
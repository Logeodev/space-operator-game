import { Player } from "./Player"

export interface playerStatus {
    pseudo : string,
    status : boolean
 }

export interface playerJoin {
  type: "connect",
  data: {
    gameId : string,
    playerId: string,
    playerName: string
  }
}

export type playerOrNull = Player | undefined
 
export interface players {
    type: string,
    data: {players : playerStatus []}
  }
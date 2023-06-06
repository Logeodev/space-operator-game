import { Player } from "./Player"

export interface playerStatus {
    pseudo : string,
    status : boolean
 }



export type playerOrNull = Player | undefined
 
export interface players {
    type: string,
    data: {players : playerStatus []}
  }
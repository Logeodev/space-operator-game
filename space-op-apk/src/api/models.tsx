import store from "../reducers/store"
import { Message } from "./socketHandler"

export interface playerJoin {
  type: "connect",
  data: {
    gameId: string,
    playerId: string,
    playerName: string
  }
}

export const playerJoin = (gameId: string, playerId: string, playerName: string): playerJoin => ({
  type: "connect",
  data: {
    gameId: gameId,
    playerId: playerId,
    playerName: playerName
  }
})

export interface gameStart {
  type: "start",
  data: {
    gameId: string
  }
}

export const gameStart = (gameId: string): gameStart => ({
  type: "start",
  data: {
    gameId: gameId
  }
})

export interface operatorFinished {
  type: "finish"
  data: {
    operator: string,
    success: boolean
  }
}

export const operatorFinished = (success: boolean): operatorFinished => ({
  type:"finish",
  data:{
    operator:store.getState().turn.operationId,
    success:success
  }
})

// ----------------- Server -> CLIENT ---------------------\\

export interface resultButton {
  order: "random" | "order",
  ids: number[]
}

export const addResultButton = (order : "random" | "order" = "order", result : number):resultButton => ({
  order : order,
  ids : [result]
})


export const addResultsButton = (order : "random" | "order" = "order", result : number []): resultButton => ({
  order : order,
  ids : result
})



export interface resultSwitch {
  ids: number[]
}

export const addResultSwitch = (ids : number []) : resultSwitch => ({
  ids : ids
})

interface element {
  type: "Switch" | "Button",
  id: Number,
  valueType: "string" | "number" | "color",
  value: String | Number,
}

export interface OperationResult {
  resultButton: resultButton,
  resultSwitch: resultSwitch,
}

export const setOperationResult = (resultButton : resultButton, resultSwitch : resultSwitch) : OperationResult => ({
  resultButton : resultButton,
  resultSwitch: resultSwitch
})

export interface Operation {
  elements: element[],
  description: String,
  result: OperationResult
}

export interface gameStartEvent {
  type: "start"
}

export enum Role {
  "Operator",
  "Instructor",
  "Waiting"
}

export interface operationEvent {
  type: "operation",
  data: {
    turn: number,
    role: Role
    id: string,
    duration: number,
    operation: Operation
  }
}

export interface Player {
  pseudo:string,
  status:boolean
}

export const newPlayer = (pseudo : string, status : boolean) : Player => 
({
  pseudo : pseudo, 
  status : status
});

export interface Integrity extends Message {
  type:"integrity",
  data: {
    integrity:number
  }
}
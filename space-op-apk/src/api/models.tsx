
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

export const operatorFinished = (operator: string, success: boolean): operatorFinished => ({
  type:"finish",
  data:{
    operator:operator,
    success:success
  }
})

// ----------------- Server -> CLIENT ---------------------\\

interface resultButton {
  order: "random" | "order",
  ids: Number[]
}

interface resultSwitch {
  ids: Number[]
}

interface element {
  type: "Switch" | "Button",
  id: Number,
  valueType: "string" | "number" | "color",
  value: String | Number,
}

interface OperationResult {
  resultButton: resultButton,
  resultSwitch: resultSwitch,
}

export interface Operation {
  elements: element[],
  descritpion: String,
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
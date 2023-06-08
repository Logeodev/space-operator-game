export interface playerJoin {
    type: "connect",
    data: {
      gameId : string,
      playerId: string,
      playerName: string
    }
  }

export interface gameStart {
  type: "start",
  data: {
      gameId: string
  }
}

export interface operatorFinished {
  type: "finish"
  data: {
    operator : string,
    success: boolean
  }
}

// ----------------- Server -> CLIENT ---------------------\\

interface resultButton {
    order: "random" | "order",
    ids: Number []
}

interface resultSwitch {
    ids: Number []
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
    elements: element [],
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
    operation : Operation
  }
}
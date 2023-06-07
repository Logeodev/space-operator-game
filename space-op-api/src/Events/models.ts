import { Operation } from "../operation/models"
import { Role } from "../Round/Round"

// ----------------- CLIENT -> SERVER ---------------------\\
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

export interface gameStartEvent {
    type: "start"
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
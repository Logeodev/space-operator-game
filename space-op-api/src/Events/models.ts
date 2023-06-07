import { Operation } from "../operation/models"
import { Role } from "../Round/Round"

export interface playerJoin {
    type: "connect",
    data: {
      gameId : string,
      playerId: string,
      playerName: string
    }
  }

export interface gameStartEvent {
    type: "start"
}

export interface gameStart {
    type: "start",
    data: {
        gameId: string
    }
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
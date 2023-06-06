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
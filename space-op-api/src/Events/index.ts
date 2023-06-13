import { Player } from "../Player/Player"
import { Game } from "../Game/Game"
import { gameInstances } from ".."
import { playersManager } from ".."
import { playerJoin, gameStart, operatorFinished } from "./models"
import { missionControl } from "../Game/models"


export const WssMessageHandlder = function (message: any) {

  const JsonObject = JSON.parse(message)
  const type: string = JsonObject.type

  if (type === "connect") {
    joinGame(JsonObject)
  }

  if (type === "start") {
    startGame(JsonObject)
  }

  if (type === "finish") {
    operationFinished(JsonObject)
  }

}

const joinGame = function (playerData: playerJoin) {
  console.log("player trying to join => " + playerData.data.playerName)
  const player: Player | undefined = playersManager.find((p: Player) => p.getId() === playerData.data.playerId)
  const game: Game | undefined = gameInstances.find((g: Game) => g.getGameId() === playerData.data.gameId)
  if (game && player) {
    player.setPseudo(playerData.data.playerName)
    if (!game.isPlayerById(player.getId())) {
      player.setGameId(game.getGameId())
      game.addPlayer(player)
      game.broadcastPlayers({
        type: "players",
        data: {
          players: game.getPlayersStatus()
        }
      })
    } else {
      player.getSocket()?.send(JSON.stringify({
        type: "error",
        data: {
          message: `Player :: ${playerData.data.playerName} already exist in the game`
        }
      }))
    }
  } else if (player) {
    player.getSocket()?.send(JSON.stringify({
      type: "error",
      data: {
        message: `Game ID :: ${playerData.data.gameId} doesn't exist`
      }
    }))
  }
}

const startGame = function (message: gameStart) {
  const game = gameInstances.find((g: Game) => g.getGameId() === message.data.gameId)
  if (game) {
    game.EventStartGame({
      type: "start"
    })
    game.startRound()
  }
}

const operationFinished = function (message: operatorFinished) {

  const game = gameInstances.find((g: Game) =>
    g.getMissionControl().find((mc: missionControl) => mc.instructorOperator.code === message.data.operator))

  if (game) {
    const missionControl = game.getMissionControl().find((mc: missionControl) => mc.instructorOperator.code === message.data.operator)

    if (missionControl) {
      missionControl.operationSucess = message.data.success
      missionControl.isFinishedReceived = true

      if(!message.data.success){
        game.setIntegrity(game.getIntegrity() - 10)
      } else{
        game.setIntegrity(game.getIntegrity() + 5)
      }

      game.broadcastIntegrity({
        type: "integrity",
        data: {
          integrity : game.getIntegrity()
        }
      })
    }

    if(game.isTurnOver()){
      game.finishRound()
    }
  }
}


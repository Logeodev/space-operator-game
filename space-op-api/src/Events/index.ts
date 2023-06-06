import { Player } from "../Player/Player"
import { Game } from "../Game/Game"
import { gameInstances } from ".."
import { playersManager } from ".."
import { playerJoin } from "./models"
import { gameStart } from "./models"

export const WssMessageHandlder = function (message : any) {

  const JsonObject = JSON.parse(message)
  const type : string = JsonObject.type

  if(type === "connect"){
    joinGame(JsonObject)
  }

  if(type === "start"){
    startGame(JsonObject)
  }
}

export const joinGame = function(playerData : playerJoin){

  const player : Player | undefined = playersManager.find((p : Player) => p.getId() === playerData.data.playerId)
  const game : Game | undefined = gameInstances.find((g : Game) => g.getGameId() === playerData.data.gameId)
  if(game && player){
    player.setPseudo(playerData.data.playerName)
    if(!game.isPlayerById(player.getId())){
      player.setGameId(game.getGameId())
      game.addPlayer(player)
      game.broadcastPlayers({
        type : "players",
        data :  {
          players: game.getPlayersStatus()
        }
      })
    } else {
      player.getSocket()?.send(JSON.stringify({
        type : "error",
        data: {
          message: `Player :: ${playerData.data.playerName} already exist in the game`
        }
      }))
    }
  }else if(player) {
    player.getSocket()?.send(JSON.stringify({
      type : "error",
      data: {
        message: `Game ID :: ${playerData.data.gameId} doesn't exist`
      }
    }))
  }
}

export const startGame = function(message : gameStart){
  const game = gameInstances.find((g : Game) => g.getGameId() === message.data.gameId)  
  if(game){
    game.EventStartGame({
      type: "start"
    })
  }
}


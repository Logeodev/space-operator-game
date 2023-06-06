import { joinGame, startGame } from "..";

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

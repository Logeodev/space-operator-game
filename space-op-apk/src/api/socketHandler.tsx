import { setGameRunning, setIntegrity, setTurn, setVictory, updatePlayers } from "../reducers/game"
import { setRole } from "../reducers/player"
import { setNewOperation } from "../reducers/round"
import store from "../reducers/store"
import { connStringWs } from "./connection"
import { Integrity, Player, operationEvent } from "./models"

export interface Message {
    type:string,
    data?:object
}

export class SocketHandler {
    private ws : WebSocket

    constructor(playerId : string) {
        this.ws = new WebSocket(connStringWs + `?id=${playerId}`)

        this.ws.onopen = () => {
            console.log("Connected to server socket")
        }

        this.ws.onmessage = this.messageReceived

        this.ws.onerror = e => {
            console.log("An error occured")
        }
        
        this.ws.onclose = e => {
            console.log(`Connection closed : ${e.code}, ${e.reason}`)
        }
    }

    sendMessage(msg:Message) {
        this.ws.send(JSON.stringify(msg));
    }

    messageReceived(msg:MessageEvent) {
        const msgData = JSON.parse(msg.data) as Message;
        switch (msgData.type) {
            case "players":
                const players = msgData.data as {"players": Player[]}
                store.dispatch(updatePlayers(players.players))
                break;
            case "start":
                store.dispatch(setGameRunning(true))
                break;
            case "operation":
                console.log('operation')
                const opEvent = msgData as operationEvent;
                store.dispatch(setTurn(opEvent.data.turn))
                store.dispatch(setRole(opEvent.data.role))
                store.dispatch(setNewOperation(opEvent.data.id, opEvent.data.operation, opEvent.data.duration))
                break;
            case "integrity":
                const integrityMessage = msgData as Integrity
                store.dispatch(setIntegrity(integrityMessage.data.integrity))
                break;
            case "victory":
                console.log('victory')
                store.dispatch(setVictory(true))
                break;
            case "destroyed":
                console.log('destroyed')
                store.dispatch(setVictory(false))
            default:
                "Unknown response";
                break;
        }
    }
}
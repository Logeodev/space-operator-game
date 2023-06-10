import { connStringWs } from "./connection"
import { playerJoin } from "./models"

export interface Message {
    type:string,
    data?:object
}

export class SocketHandler {
    private ws : WebSocket

    constructor() {
        this.ws = new WebSocket(connStringWs)

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

    messageReceived(msg:MessageEvent):Message {
        const msgData = JSON.parse(msg.data);
        return msgData as Message
    }
}
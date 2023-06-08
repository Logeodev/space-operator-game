import { connStringWs } from "./connection"

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

    messageReceived<T extends Message>(msg:MessageEvent) {
        const msgData : T = JSON.parse(msg.data);
        return msgData as T
    }
}
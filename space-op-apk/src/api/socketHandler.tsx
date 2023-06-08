import { connStringWs } from "./connection"

interface Message<T extends object> {
    type:string,
    data?:T
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

    sendMessage<T extends object>(msg:Message<T>) {
        this.ws.send(JSON.stringify(msg));
    }

    messageReceived<T extends object>(msg:MessageEvent) {
        const msgData : Message<T> = JSON.parse(msg.data);
        return msgData as Message<T>
    }
}
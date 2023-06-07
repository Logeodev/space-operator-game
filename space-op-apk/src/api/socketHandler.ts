import { connStringWs } from "./connection"

interface Message {
    type:string,
    data?:object
}

export class SocketHandler {
    private ws : WebSocket

    constructor() {
        this.ws = new WebSocket(connStringWs)

        this.ws.onopen = () => {

        }

        this.ws.onmessage = e => {

        }

        this.ws.onerror = e => {
            console.log("An error occured")
        }

        this.ws.onclose = e => {
            console.log("Connection closed")
        }
    }

    sendMessage(msg:Message) {
        this.ws.send(JSON.stringify(msg));
    }
}
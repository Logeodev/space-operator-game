import axios from "axios"
import connString from "./connection"

const handlePlayerReady = (playerId : number) => {
    axios.post(`${connString}/${playerId}`)
        .catch((e) => console.log(e))
}

export default handlePlayerReady
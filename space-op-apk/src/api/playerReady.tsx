import axios from "axios"
import connString from "./connection"

const handlePlayerReady = (playerId : string) => {
    axios.post(`${connString}/game/ready`,{playerId : playerId})
        .catch((e) => console.log(e))
}

export default handlePlayerReady
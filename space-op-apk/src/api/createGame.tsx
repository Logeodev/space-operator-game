import axios from "axios"
import connString from "./connection"

interface Player {
    id:string,
    pseudo:string
}

export const handleCreateGame = () => {
    return axios.post(`${connString}/game/create`)
        .then(res => {
            return res.data.message
        })
        .catch(e=>console.log(e))
}

export const handleKillGame = (gameId:string) => {
    return axios.post(`${connString}/game/kill`, {data : {gameId : gameId}})
    .then(res => console.log(res.status))
        .catch(e => console.log(e))
}
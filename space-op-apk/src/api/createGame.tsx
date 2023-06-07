import axios from "axios"
import connString from "./connection"

interface Player {
    id:string,
    pseudo:string
}

export const handleCreateGame = (player:Player) => {
    return axios.post(`${connString}/game/create`, player)
        .then(res => res.data.message)
        .catch(e=>console.log(e))
}

export const handleStartGame = () => {
    return axios.post(connString)
}

export const handleKillGame = (gameId:string) => {
    return axios.delete(`${connString}/game/kill/${gameId}`)
        .catch(e => console.log(e))
}
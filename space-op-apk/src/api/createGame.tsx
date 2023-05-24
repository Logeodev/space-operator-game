import axios from "axios"
import connString from "./connection"

interface Player {
    id:string,
    pseudo:string
}

export const handleCreateGame = (gameId:string, player:Player) => {
    return axios.post(`${connString}/game/create/${gameId}`, player)
        .catch(e=>console.log(e))
}

export const handleStartGame = () => {
    return axios.post(connString)
}
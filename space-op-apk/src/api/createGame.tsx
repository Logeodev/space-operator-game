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
    return axios.delete(`${connString}/game/kill/${gameId}`)
        .catch(e => console.log(e))
}
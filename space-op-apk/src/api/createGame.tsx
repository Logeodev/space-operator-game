import axios from "axios"
import connString from "./connection"
import { useAppDispatch } from "../reducers/store"
import { setId } from "../reducers/game"

interface Player {
    id:string,
    pseudo:string
}

export const handleCreateGame = () => {
    const dispatch = useAppDispatch()
    return axios.post(`${connString}/game/create`)
        .then(res => {
            dispatch(setId(res.data.message))
            return res.data.message
        })
        .catch(e=>console.log(e))
}

export const handleKillGame = (gameId:string) => {
    return axios.delete(`${connString}/game/kill/${gameId}`)
        .catch(e => console.log(e))
}
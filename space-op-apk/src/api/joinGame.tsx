import axios from "axios";
import connString from "./connection";

const handleJoinGame = (gId:string, psd:string, pId:string) => {
    return axios.post(`${connString}/join/${gId}`, {pseudo:psd, playerId:pId})
        .then((res) => {

        })
        .catch((err) => {
            console.log(err);
        });
}

export default handleJoinGame;
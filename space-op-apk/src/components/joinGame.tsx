import { Text, TextInput, TouchableOpacity, View } from "react-native"
import styles from "../utils/style"
import { useState } from "react"
import { Link } from "react-router-native"
import { useAppDispatch, useAppSelector } from "../reducers/store"
import { wsHandler } from "../../App"
import { playerJoin } from "../api/models"
import { setGameId } from "../reducers/game"


const JoinGameScreen = () => {
    const dispatch = useAppDispatch()
    const [gameId, setGId] = useState("")
    const {pseudo, id} = useAppSelector(state => state.user)
    return <View style={styles.container}>
        <Text style={styles.label}>Votre pseudo : {pseudo}</Text>

        <Text style={styles.title}>Rejoindre une partie</Text>

        <Text style={styles.label}>ID de la partie:</Text>
        <TextInput style={styles.textInput} placeholder="ID de partie" onChangeText={setGId}/>

        <View style={styles.btnPrimary}>
            <TouchableOpacity onPress={()=>{
                wsHandler.sendMessage(
                    playerJoin(gameId, id, pseudo)
                ); 
                dispatch(setGameId(gameId))
            }}>
                <Text>Rejoindre</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.btnSecondary}>
            <Link to="/"><Text>Retour</Text></Link>
        </View>
    </View>
}

export default JoinGameScreen;
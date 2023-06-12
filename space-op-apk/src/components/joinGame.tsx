import { Text, TextInput, TouchableOpacity, View } from "react-native"
import styles from "../utils/style"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-native"
import { useAppDispatch, useAppSelector } from "../reducers/store"
import { wsHandler } from ".."
import { playerJoin } from "../api/models"
import { setGameId2 } from "../reducers/game"


const JoinGameScreen = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [gameId, setGId] = useState("")
    const {pseudo, playerId} = useAppSelector(state => state.player)
    const gameIsStarted = useAppSelector(state => state.game.started)

    useEffect(() => {
        gameIsStarted&&navigate("/game")
    }, [gameIsStarted])

    return <View style={styles.container}>
        <Text style={styles.label}>Votre pseudo : {pseudo}</Text>

        <Text style={styles.title}>Rejoindre une partie</Text>

        <Text style={styles.label}>ID de la partie:</Text>
        <TextInput style={styles.textInput} placeholder="ID de partie" onChangeText={setGId}/>

        <View style={styles.btnPrimary}>
            <Link to='/create-game' onPress={()=>{
                wsHandler.sendMessage(
                    playerJoin(gameId, playerId, pseudo)
                ); 
                dispatch(setGameId2(gameId))
            }}>
                <Text>Rejoindre</Text>
            </Link>
        </View>

        <View style={styles.btnSecondary}>
            <Link to="/"><Text>Retour</Text></Link>
        </View>
    </View>
}

export default JoinGameScreen;
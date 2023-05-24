import { Text, TextInput, TouchableOpacity, View } from "react-native"
import styles from "./style"
import { useState } from "react"
import { Link } from "react-router-native"
import { useAppSelector } from "../reducers/store"
import handleJoinGame from "../api/joinGame"


const JoinGameScreen = () => {
    const [gameId, setGameId] = useState("")
    const {pseudo, id} = useAppSelector(state => state.user)

    return <View style={styles.container}>
        <Text style={styles.title}>Rejoindre un partie</Text>

        <Text style={styles.label}>ID de la partie:</Text>
        <TextInput style={styles.textInput} placeholder="ID de partie" onChangeText={setGameId}/>

        <View style={styles.btnPrimary}>
            <TouchableOpacity onPress={()=>handleJoinGame(gameId, pseudo, id)}>
                <Text>Rejoindre</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.btnSecondary}>
            <Link to="/"><Text>Retour</Text></Link>
        </View>
    </View>
}

export default JoinGameScreen;
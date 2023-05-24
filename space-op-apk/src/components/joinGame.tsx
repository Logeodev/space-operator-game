import { Text, TextInput, View } from "react-native"
import styles from "./style"
import { useState } from "react"
import { Link } from "react-router-native"

const JoinGameScreen = () => {
    const [gameId, setGameId] = useState("")

    return <View style={styles.container}>
        <Text style={styles.title}>Rejoindre un partie</Text>

        <Text style={styles.label}>ID de la partie:</Text>
        <TextInput style={styles.textInput} placeholder="ID de partie" onChangeText={setGameId}/>

        <View style={styles.btnPrimary}>
            <Link to=""><Text>Rejoindre</Text></Link>
        </View>

        <View style={styles.btnSecondary}>
            <Link to="/"><Text>Retour</Text></Link>
        </View>
    </View>
}

export default JoinGameScreen;
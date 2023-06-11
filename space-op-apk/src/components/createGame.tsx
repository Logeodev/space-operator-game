import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../utils/style';
import { Link } from 'react-router-native';
import { useAppSelector } from '../reducers/store';
import { handleKillGame } from '../api/createGame';
import { wsHandler } from '..';
import { gameStart } from '../api/models';

const CreateGameScreen = () => {
    const pseudo = useAppSelector((state) => state.player.pseudo)
     const gameId = useAppSelector(state => state.game.gameId)
    const playerId = useAppSelector((state) => state.player.playerId)

    console.log("root CGS => " + playerId)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer une partie</Text>

            <Text style={styles.label}>ID : {gameId}</Text>

            <View style={styles.playerList}>
                <Text style={styles.text}>{pseudo}</Text>
            </View>

            <View style={styles.btnPrimary}>
                <TouchableOpacity onPress={()=>wsHandler.sendMessage(gameStart(gameId))}>
                    <Text>Démarrer la partie</Text>
                </TouchableOpacity>
            </View>
   
            <View style={styles.btnSecondary}>
                <Link to='/' onPress={() =>handleKillGame(gameId)}><Text>Retour</Text></Link>
            </View>
        </View>
    );
};

export default CreateGameScreen;

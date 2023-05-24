import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { Link } from 'react-router-native';
import { useAppSelector } from '../reducers/store';
import { generateGameID } from './UID';
import { handleCreateGame, handleStartGame } from '../api/createGame';

const CreateGameScreen = () => {
    const gameId = generateGameID();
    const {pseudo, id} = useAppSelector((state) => state.user)

    useEffect(() => {
        handleCreateGame(gameId, {id:id, pseudo:pseudo})
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer une partie</Text>

            <Text style={styles.label}>ID de la partie:</Text>
            <Text style={styles.text}>{gameId}</Text>

            <View style={styles.playerList}>
                <Text style={styles.text}>{pseudo}</Text>
            </View>

            <View style={styles.btnPrimary}>
                <TouchableOpacity onPress={handleStartGame}>
                    <Text>Démarrer la partie</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.btnSecondary}>
                <Link to='/'><Text>Retour</Text></Link>
            </View>
        </View>
    );
};

export default CreateGameScreen;

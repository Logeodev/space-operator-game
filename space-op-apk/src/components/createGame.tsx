import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { Link } from 'react-router-native';
import { useAppSelector } from '../reducers/store';
import { generateGameID } from './UID';

const CreateGameScreen = () => {
    const gameId = generateGameID();
    const currPseudo = useAppSelector((state) => state.user.pseudo)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer une partie</Text>

            <Text style={styles.label}>ID de la partie:</Text>
            <Text style={styles.text}>{gameId}</Text>

            <View style={styles.playerList}>
                <Text style={styles.text}>{currPseudo}</Text>
            </View>

            <View style={styles.btnPrimary}>
                <Link to='/game'><Text>Démarrer la partie</Text></Link>
            </View>
            
            <View style={styles.btnSecondary}>
                <Link to='/'><Text>Retour</Text></Link>
            </View>
        </View>
    );
};

export default CreateGameScreen;

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../utils/style';
import { Link } from 'react-router-native';
import { useAppSelector } from '../reducers/store';
import { handleKillGame } from '../api/createGame';
import { wsHandler } from '..';
import { Player, gameStart } from '../api/models';
import { Octicons } from '@expo/vector-icons';
import handlePlayerReady from '../api/playerReady';


const CreateGameScreen = () => {
     const gameId = useAppSelector(state => state.game.gameId)
     const playerId = useAppSelector((state) => state.player.playerId)
     const players : Player [] = useAppSelector((state) => state.game.players.players)
     const turn = useAppSelector((state) => state.turn)
     console.log(turn.operationId)
     if(turn.operation){
         console.log(turn.operation)
     }


     console.log("root CGS => " + playerId)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer une partie</Text>

            <Text style={styles.label}>ID : {gameId}</Text>

            <View style={styles.playerList}>
              { players? players?.map((p : Player) => {
                return (
                        <View key={p?.pseudo} style={styles.playerCard}>
                            <Text>{p?.pseudo}</Text>
                            {p.status ? 
                                <Octicons name="dot-fill" size={24} color="green" />
                                :
                                <Octicons name="dot-fill" size={24} color="red" />
                            }
                        </View>)}) 
                    
                    : <View></View> 
            }
            </View>
            <View style={styles.btnPrimary}>
                <TouchableOpacity onPress={()=>handlePlayerReady(playerId)}>
                    <Text>Ready</Text>
                </TouchableOpacity>
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

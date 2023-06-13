import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../utils/style';
import { Link, useNavigate } from 'react-router-native';
import { useAppDispatch, useAppSelector } from '../reducers/store';
import { handleKillGame } from '../api/createGame';
import { wsHandler } from '..';
import { Player, gameStart } from '../api/models';
import { Octicons } from '@expo/vector-icons';
import handlePlayerReady from '../api/playerReady';
import { killGame } from '../reducers/game';

const CreateGameScreen = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const gameId = useAppSelector(state => state.game.gameId)
    const playerId = useAppSelector((state) => state.player.playerId)
    const players: Player[] = useAppSelector((state) => state.game.players)
    const turn = useAppSelector((state) => state.turn)
    const gameIsStarted = useAppSelector(state => state.game.started)

    useEffect(() => {
        gameIsStarted && navigate("/game")
    }, [gameIsStarted])

    const isPlayersReady = players.filter(t => t.status === true).length != players.length

    const resetGame = () => {
        console.log("============================== RESET GAME ========================")
        console.log(gameId)
        handleKillGame(gameId)
        dispatch(killGame())
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer une partie</Text>

            <Text style={styles.label}>ID : {gameId}</Text>

            <View style={styles.playerList}>
                {players ? players?.map((p: Player) => {
                    return (
                        <View key={p?.pseudo} style={styles.playerCard}>
                            <Text>{p?.pseudo}</Text>
                            {p.status ?
                                <Octicons name="dot-fill" size={24} color="green" />
                                :
                                <Octicons name="dot-fill" size={24} color="red" />
                            }
                        </View>)
                })

                    : <View></View>
                }
            </View>
            <View style={styles.btnPrimary}>
                <TouchableOpacity onPress={() => handlePlayerReady(playerId)}>
                    <Text>Ready</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnPrimary}>
                <TouchableOpacity disabled={isPlayersReady} onPress={() => wsHandler.sendMessage(gameStart(gameId))}>
                    <Text>Démarrer la partie</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.btnSecondary}>
                <Link to='/' onPress={() => resetGame()}><Text>Retour</Text></Link>
            </View>
        </View>
    );
};

export default CreateGameScreen;

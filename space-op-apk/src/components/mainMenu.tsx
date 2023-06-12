import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../utils/style';
import { Link } from 'react-router-native';
import {setPseudo } from '../reducers/player';
import { setGameId2 } from '../reducers/game';
import { useAppDispatch, useAppSelector } from '../reducers/store';
import { handleCreateGame } from '../api/createGame';
import { playerJoin } from '../api/models';
import { wsHandler } from '..';
import ChronometerDisplay from '../utils/GameElements/chronometer';

const MainMenu = () => {
 const dispatch = useAppDispatch();
 const pseudo = useAppSelector(state => state.player.pseudo)
 const playerId = useAppSelector(state => state.player.playerId)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space Operator</Text>

      <Text style={styles.label}>Nom du joueur:</Text>
      <TextInput style={styles.textInput} onChangeText={e => {dispatch(setPseudo(e));}} placeholder='Pseudo' />

      <Text style={styles.label}>ID du joueur:</Text>
      <Text style={styles.text}>{playerId}</Text>

      <View style={styles.btnPrimary}>
        <Link to='/create-game' onPress={() => {
          handleCreateGame()
          .then(msg => {dispatch(setGameId2(msg)); return msg;})
          .then((m) => wsHandler.sendMessage(playerJoin(m, playerId, pseudo)))  
        }}><Text>Créer une partie</Text></Link>
      </View>

      <View style={styles.btnPrimary}>
        <Link to='/join-game'><Text>Rejoindre une partie</Text></Link>
      </View>

      <View style={styles.btnSecondary}>
        <Link to='/'><Text>Quitter</Text></Link>
      </View>

      <ChronometerDisplay totalTime={40} elapsedTime={0}/>
    </View>
  );
};

export default MainMenu;
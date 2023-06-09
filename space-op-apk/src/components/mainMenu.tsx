import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../utils/style';
import { Link } from 'react-router-native';
import { setPseudo } from '../reducers/player';
import { setGameId2 } from '../reducers/game';
import { useAppDispatch, useAppSelector } from '../reducers/store';
import { handleCreateGame } from '../api/createGame';
import { playerJoin } from '../api/models';
import { wsHandler } from '..';

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector(state => state.player.pseudo)
  const playerId = useAppSelector(state => state.player.playerId)
  const game = useAppSelector(state => state.game)

  const log = () => {
    console.log(game)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space Operator</Text>

      <Text style={styles.label}>Nom du joueur:</Text>
      <TextInput style={styles.textInput} onChangeText={e => { dispatch(setPseudo(e)); }} placeholder='Pseudo' defaultValue={pseudo} />

      <Text style={styles.label}>ID du joueur:</Text>
      <Text style={styles.text}>{playerId}</Text>

      <View style={styles.btnPrimary}>
        <Link to='/create-game' onPress={() => {
          handleCreateGame()
            .then(msg => { dispatch(setGameId2(msg)); return msg; })
            .then((m) => wsHandler.sendMessage(playerJoin(m, playerId, pseudo)))
        }}><Text>Créer une partie</Text></Link>
      </View>

      <View style={styles.btnPrimary}>
        <Link to='/join-game'><Text>Rejoindre une partie</Text></Link>
      </View>

      <View style={styles.btnSecondary}>
        <Link onPress={() => log(
          
        )} to='/'><Text>Quitter</Text></Link>
      </View>
    </View>
  );
};

export default MainMenu;
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
import ChronometerDisplay from '../utils/GameElements/chronometer';

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector(state => state.player.pseudo)
  const playerId = useAppSelector(state => state.player.playerId)

  // testing here ------------------
  const duration = 40 // sec
  const [time, setTime] = useState(duration)
  useEffect(() => {
    if (time <= 0) {
      setTime(-1)
      console.log('Timer over')
      return ()=>clearInterval(timer)
    }
    const timer = setInterval(() => {
      setTime(time-1)
      console.log(`timer : ${time}`)
    }, 1000);
    return ()=>clearInterval(timer)
  }, [time])
  // -------------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space Operator</Text>

      <Text style={styles.label}>Nom du joueur:</Text>
      <TextInput style={styles.textInput} onChangeText={e => { dispatch(setPseudo(e)); }} placeholder='Pseudo' />

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
        <Link to='/'><Text>Quitter</Text></Link>
      </View>

      <ChronometerDisplay time={time} totalTime={duration} />

    </View>
  );
};

export default MainMenu;
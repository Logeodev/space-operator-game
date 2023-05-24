import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './style';
import generateUniqueID from './UID';
import { Link } from 'react-router-native';
import { setId, setPseudo } from '../reducers/player';
import { useAppDispatch } from '../reducers/store';

const MainMenu = () => {
  const playerId = generateUniqueID();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space Operator</Text>

      <Text style={styles.label}>Nom du joueur:</Text>
      <TextInput style={styles.textInput} onChangeText={e => {dispatch(setPseudo(e)); dispatch(setId(playerId));}} placeholder='Pseudo'/>

      <Text style={styles.label}>ID du joueur:</Text>
      <Text style={styles.text}>{playerId}</Text>

      <View style={styles.btnPrimary}>
        <Link to='/create-game'><Text>Créer une partie</Text></Link>
      </View>

      <View style={styles.btnPrimary}>
        <Link to='/join-game'><Text>Rejoindre une partie</Text></Link>
      </View>

      <View style={styles.btnSecondary}>
        <Link to='/'><Text>Quitter</Text></Link>
      </View>

    </View>
  );
};

export default MainMenu;
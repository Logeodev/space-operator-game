import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../utils/style';
import generateUniqueID from '../utils/UID';
import { Link } from 'react-router-native';
import { setId, setPseudo } from '../reducers/player';
import { useAppDispatch, useAppSelector } from '../reducers/store';
import { handleCreateGame } from '../api/createGame';
import ButtonElement from '../utils/GameElements/buttonElement';
import SwitchElement from '../utils/GameElements/switchElement';
import LifeBarElement from '../utils/GameElements/lifeBar';

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const playerId = generateUniqueID();
  const pseudo = useAppSelector(state => state.user.pseudo)
  const id = useAppSelector(state => state.user.id)

  useEffect(() => {dispatch(setId(playerId))},[])

  const [temp, setTemp] = useState(100)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space Operator</Text>

      <Text style={styles.label}>Nom du joueur:</Text>
      <TextInput style={styles.textInput} onChangeText={e => {dispatch(setPseudo(e));}} placeholder='Pseudo' defaultValue={pseudo}/>

      <Text style={styles.label}>ID du joueur:</Text>
      <Text style={styles.text}>{playerId}</Text>

      <View style={styles.btnPrimary}>
        <Link to='/create-game' onPress={() => handleCreateGame()}><Text>Créer une partie</Text></Link>
      </View>

      <View style={styles.btnPrimary}>
        <Link to='/join-game'><Text>Rejoindre une partie</Text></Link>
      </View>

      <View style={styles.btnSecondary}>
        <Link to='/' onPress={()=>setTemp(temp-10)}><Text>Quitter</Text></Link>
      </View>
      <LifeBarElement value={temp} />
      <ButtonElement id={0} valueType='number' value={2} />
      <SwitchElement id={1} valueType='color' value='#ff0000' />
    </View>
  );
};

export default MainMenu;
import MainMenu from './components/mainMenu';
import CreateGameScreen from './components/createGame';
import { NativeRouter, Routes, Route } from 'react-router-native';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from './reducers/store';
import JoinGameScreen from './components/joinGame';
import { SocketHandler } from './api/socketHandler';
import generateUniqueID from './utils/UID';
import React, {useEffect} from 'react'
import { setId as setPlayerId } from './reducers/player';


const playerId = generateUniqueID();
export const wsHandler = new SocketHandler(playerId);


export default function SpaceOperatorGame() {
  const dispatch = useAppDispatch()

  useEffect(() => {
   dispatch(setPlayerId(playerId))
  }, []);

  return (
    <Provider store={store}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/create-game" element={<CreateGameScreen />} />
          <Route path="/join-game" element={<JoinGameScreen />}/>
        </Routes>
      </NativeRouter>
    </Provider>
  );
}
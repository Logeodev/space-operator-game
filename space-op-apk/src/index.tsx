import MainMenu from './components/mainMenu';
import CreateGameScreen from './components/createGame';
import { NativeRouter, Routes, Route } from 'react-router-native';
import JoinGameScreen from './components/joinGame';
import { SocketHandler } from './api/socketHandler';
import generateUniqueID from './utils/UID';
import React, { useEffect } from 'react';
import { useAppDispatch } from './reducers/store';
import { setPlayerId } from './reducers/player';
import { GamePage } from './components/gamePage';


const playerId = generateUniqueID();
export const wsHandler = new SocketHandler(playerId);

export default function SapceOperatorGame() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setPlayerId(playerId)); 
        },[])
     

  return (
    <NativeRouter>
    <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/create-game" element={<CreateGameScreen />} />
        <Route path="/join-game" element={<JoinGameScreen />}/>
        <Route path="/game" element={<GamePage />}/>
      </Routes>
    </NativeRouter>
  );
}
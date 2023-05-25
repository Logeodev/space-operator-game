import MainMenu from './src/components/mainMenu';
import CreateGameScreen from './src/components/createGame';
import { NativeRouter, Routes, Route } from 'react-router-native';
import { Provider } from 'react-redux';
import store from './src/reducers/store';
import JoinGameScreen from './src/components/joinGame';

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/create-game" element={<CreateGameScreen />} />
          <Route path="/join-game" element={<JoinGameScreen/>}/>
        </Routes>
      </NativeRouter>
    </Provider>
  );
}
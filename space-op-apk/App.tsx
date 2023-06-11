import { Provider } from 'react-redux';
import store from './src/reducers/store';
import SpaceOperatorGame from './src';
import React from 'react'

export default function App() {

  return (
    <Provider store={store}>
      <SpaceOperatorGame />
    </Provider>
  );
}
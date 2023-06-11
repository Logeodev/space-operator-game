
import { Provider } from 'react-redux';
import store from './src/reducers/store';
import SapceOperatorGame from './src';




export default function App() {
  return (
    <Provider store={store}>
      < SapceOperatorGame />
    </Provider>
  );
}
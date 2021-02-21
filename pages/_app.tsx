import firebase from 'firebase';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import firebaseConfig from '../lib/firebase';
import { newStore, wrapper } from '../store';
import '../styles/globals.css';

interface Props extends AppProps {
  reduxStore: Store;
}

const MyApp = ({ Component, pageProps }: Props) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const store = newStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { newStore, wrapper } from '../store';
import '../styles/globals.css';

interface Props extends AppProps {
  reduxStore: Store;
}

const MyApp = ({ Component, pageProps }: Props) => {
  const store = newStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);

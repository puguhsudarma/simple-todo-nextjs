import { AppContext, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import initFirebase from '../lib/firebase';
import withReduxStore from '../lib/withReduxStore';
import '../styles/globals.css';

interface Props extends AppProps {
  reduxStore: Store;
}

const MyApp = ({ Component, pageProps, reduxStore }: Props) => {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />;
    </Provider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // init the firebase
  initFirebase();

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
  };
};

export default withReduxStore(MyApp);

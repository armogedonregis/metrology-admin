import React from 'react'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import { Provider } from 'react-redux'
import '../css/main.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'



function MyApp({ Component, ...rest }: AppProps) {

  const { store, props } = wrapper.useWrappedStore(rest);

  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;

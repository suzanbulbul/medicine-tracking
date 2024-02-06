import React from "react";

//Toaster
import { Toaster } from 'react-hot-toast';

//Styles
import '../styles/style.scss'

function MyApp({ Component, pageProps }) {

  return (
      <><Component {...pageProps} /><Toaster /></>
  );
}

export default MyApp;
import Head from "next/head";
// add css 
import 'bootstrap/dist/css/bootstrap.css'
import 'nprogress/nprogress.css';
import 'react-quill/dist/quill.snow.css';
import '../styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
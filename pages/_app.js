import Head from "next/head";
// add css 
import 'bootstrap/dist/css/bootstrap.css'
import 'nprogress/nprogress.css';
import 'react-quill/dist/quill.snow.css';
import '../public/css/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <script data-ad-client="ca-pub-3283607139562325" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
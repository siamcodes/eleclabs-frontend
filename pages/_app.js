import Head from "next/head";
// add css 
import 'bootstrap/dist/css/bootstrap.css'
import 'nprogress/nprogress.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import '../public/css/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <script data-ad-client="ca-pub-6218184931833362" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
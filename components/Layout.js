import Head from 'next/head'
import React from 'react';
import Header from './Header';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Layout = ({ children }) => {

     const setGoogleTags = () => {
        if (publicRuntimeConfig.PRODUCTION) {
            return {
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '259605935');
            `
            };
        }
    }  

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=259605935"></script>
                 <React.Fragment>
                    <script dangerouslySetInnerHTML={setGoogleTags()} />
                </React.Fragment>  
            </Head>
                <Header />
                {children}     
        </>
    );
};

export default Layout;

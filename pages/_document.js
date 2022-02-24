import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='us'>
            <Head>
                <meta name="theme-color" content="#ffffff" />
                <meta name="description" content="Portfolio" />
                <meta name="keywords" content="Cristian Viterales" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
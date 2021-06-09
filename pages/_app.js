import Head from "next/head";
import "../styles/globals.css";


function IECustomLoader({ Component, pageProps }) {

    return (
	    <>
	      <Head>
		<link rel="icon" type="image/png" href="/favicon.png"/>
		<meta name="viewport" content="initial-scale=1.0" />
		<meta name="description" content="Learn how to use ImageEngine with Nextjs custom loaders to serve highly optimised image assets from your CDN to your users." />
		<meta property="og:title" content="ImageEngine with NextJS" />
		<meta property="og:description" content="Learn how to use ImageEngine with Nextjs custom loaders to serve highly optimised image assets from your CDN to your users." />
	      </Head>
	      <Component {...pageProps} />
	    </>
    );
};

export default IECustomLoader;

import Head from "next/head";
import type { AppProps } from "next/app";

const ToolsApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>Hurtak&apos;s Tools</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default ToolsApp;

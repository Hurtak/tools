import { type AppProps } from "next/app";
// @deno-types="../types/next-head.d.ts"
import Head from "next/head";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import "../styles.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Tools</title>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    </Head>

    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <Component {...pageProps} />
      </AntdApp>
    </ConfigProvider>
  </>
);

export default App;

import { type AppProps } from "next/app";
import NextHead from "next/head";
import { App as AntdApp, ConfigProvider, theme } from "antd";

import "../styles.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <NextHead>
      <title>Tools</title>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    </NextHead>

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

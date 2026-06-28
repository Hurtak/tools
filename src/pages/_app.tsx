import { type AppProps } from "next/app";
import NextHead from "next/head";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <NextHead>
      <title>Tools</title>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    </NextHead>

    <Theme>
      <Component {...pageProps} />
    </Theme>
  </>
);

export default App;

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Goerli}
      authConfig={{ domain: "localhost", authUrl: "/api/auth" }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

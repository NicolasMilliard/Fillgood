import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import Layout from '../components/Layout/Layout';
import { FillgoodProvider } from '../context';

import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains([localhost], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'FillgoodProvider',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={lightTheme({
          accentColor: '#050507',
          accentColorForeground: '#e1e1e5',
          borderRadius: 'medium',
          fontStack: 'system',
        })}
      >
        <FillgoodProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FillgoodProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;

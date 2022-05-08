import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

const initWeb3 = (provider: any) => {
  const web3: any = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
};

export const Web3Context = createContext<Web3Modal | null>(null);

export const useWeb3Context = () => {
  const [address, setAddress] = useState('');
  const web3Context = useContext(Web3Context);

  useEffect(() => {
    console.log('in use web3 context ', web3Context);
  }, [web3Context]);

  useEffect(() => {
    if (web3Context?.cachedProvider) connect();
  }, []);

  const connect = async () => {
    if (web3Context) {
      const provider = await web3Context.connect();
      const web3 = initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      setAddress(accounts[0]);
    }
  };

  return useMemo(() => {
    return { connect, address };
  }, [web3Context, address]);
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: '3d572bfd871a492dbf95a5dc91ee0e5c', // required
    },
  },
};

interface Web3ContextProviderProps {
  children?: ReactNode;
}

export const Web3ContextProvider: FC<Web3ContextProviderProps> = ({
  children,
}) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  useEffect(() => {
    const initialModal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions,
    });
    setWeb3Modal(initialModal);
  }, []);

  return (
    <Web3Context.Provider value={web3Modal}>{children}</Web3Context.Provider>
  );
};

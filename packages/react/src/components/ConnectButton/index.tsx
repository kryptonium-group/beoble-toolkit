import styled from 'styled-components';
import React, { FC } from 'react';
import Web3Modal from 'web3modal';
import Logo from '../../assets/svg/beoble_white.svg';
import Button from '../Button';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectButtonProps {}

const StyledConnectButton = styled.div``;

export const ConnectButton: FC<ConnectButtonProps> = () => {
  /*
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '8c5a93b7f53e4d848987720180fa1acf',
      },
    },
  };
  */

  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: false,
    theme: 'dark',
  });

  const connect = async () => {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
  };

  return (
    <StyledConnectButton>
      <Button onClick={connect}>
        <img
          src={Logo}
          width={20}
          style={{ marginRight: 6 }}
          alt="logo_white"
        />
        Connect
      </Button>
    </StyledConnectButton>
  );
};

export default ConnectButton;

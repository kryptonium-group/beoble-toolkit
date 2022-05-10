import styled from 'styled-components';
import Button from '../../components/Button';
import Identication from '../../components/Identication';
import BeobleSDK from '@beoble/js-sdk';
import { useState } from 'react';
import Logo from '../../assets/svg/beoble_white.svg';
import useBeoble from '../../hooks/useBeoble/useBeoble';

/* eslint-disable-next-line */
export interface StatusButtonProps {
  onClick?: () => void;
}

const StatusButtonContainer = styled.div``;

const Address = styled.p`
  margin: 0;
  margin-right: 6px;
`;

const StatusButton = ({ onClick }: StatusButtonProps) => {
  const [connected, setConnected] = useState(false);
  const Beoble = useBeoble();

  const handleClickTest = async () => {
    setConnected(!connected);
    onClick && onClick();
    Beoble?.initProvider();
    const signer = Beoble?.provider?.getSigner();
    const address = await signer?.getAddress();
    console.log(`Account: ${address}`);

    const ensName = await Beoble?.provider?.lookupAddress(address as string);
    console.log(`ENS Name: ${ensName}`);

    const ensAvatar = await Beoble?.provider?.getAvatar(ensName as string);
    console.log(`ENS Avatar: ${ensAvatar}`);
  };

  return (
    <StatusButtonContainer>
      <Button onClick={handleClickTest}>
        <Address>{BeobleSDK.Util.shortenAddress('bamnenim.eth')}</Address>
        <Identication
          diameter={16}
          account="0xb033fB14cF7Dc769488Ad34Ae90D4b3AD810BB25"
        />
      </Button>
    </StatusButtonContainer>
  );
};

export default StatusButton;

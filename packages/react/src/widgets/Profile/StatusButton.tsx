import styled from 'styled-components';
import Button from '../../components/Button';
import Identication from '../../components/Identication';
import BeobleSDK from '@beoble/js-sdk';
import { useCallback, useState } from 'react';
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
  const { isInitialized, initialize, address, ENSName, ENSAvatar } =
    useBeoble();

  const handleClickTest = useCallback(async () => {
    onClick && onClick();
    if (!isInitialized) initialize();
    console.log(address, ENSAvatar, ENSName);
  }, [onClick, isInitialized, initialize, address, ENSAvatar, ENSName]);

  return (
    <StatusButtonContainer>
      <Button onClick={handleClickTest}>
        <Address>
          {BeobleSDK.Util.shortenAddress(ENSName ?? address ?? 'not connected')}
        </Address>
        {address && <Identication diameter={16} account={address} />}
      </Button>
    </StatusButtonContainer>
  );
};

export default StatusButton;

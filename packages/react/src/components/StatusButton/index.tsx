import styled from 'styled-components';
import Button from '../Button';
import Identication from '../Identication';
import { BeobleSDK } from '@beoble/js-sdk';
import { useCallback, useEffect, useState } from 'react';
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

export const StatusButton = ({ onClick }: StatusButtonProps) => {
  const { initialized, account } = useBeoble();

  const handleClickTest = useCallback(async () => {
    onClick && onClick();
    console.log(account);
  }, [onClick, account]);

  return (
    <StatusButtonContainer>
      <Button onClick={handleClickTest}>
        <Address>
          {BeobleSDK.utils.truncateString(
            account?.ensName ?? account?.address ?? 'not connected',
            16
          )}
        </Address>
        <Identication diameter={16} account={account?.address ?? ''} />
      </Button>
    </StatusButtonContainer>
  );
};

export default StatusButton;

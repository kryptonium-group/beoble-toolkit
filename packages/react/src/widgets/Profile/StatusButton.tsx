import styled from 'styled-components';
import Button from '../../components/Button';
import Identication from '../../components/Identication';
import BeobleSDK from '@beoble/js-sdk';

/* eslint-disable-next-line */
export interface StatusButtonProps {}

const StatusButtonContainer = styled.div``;

const Address = styled.p`
  margin: 0;
  margin-right: 6px;
`;

const StatusButton = () => {
  const handleClickTest = () => {
    console.log('hi');
  };

  return (
    <StatusButtonContainer>
      <Button onClick={handleClickTest}>
        <Address>{BeobleSDK.Util.shortenAddress('bamnenim.eth')}</Address>
        <Identication diameter={16} />
      </Button>
    </StatusButtonContainer>
  );
};

export default StatusButton;

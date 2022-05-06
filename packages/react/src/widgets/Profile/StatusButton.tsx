import styled from 'styled-components';
import Button from '../../components/Button';
import Identication from '../../components/Identication';

/* eslint-disable-next-line */
export interface StatusButtonProps {}

const StatusButtonContainer = styled.div``;

const StatusButton = () => {
  const handleClickTest = () => {
    console.log('hi');
  };

  return (
    <StatusButtonContainer>
      <Button onClick={handleClickTest}>
        <Identication diameter={16} />
      </Button>
    </StatusButtonContainer>
  );
};

export default StatusButton;

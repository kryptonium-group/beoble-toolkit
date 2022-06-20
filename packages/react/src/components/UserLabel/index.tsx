import { ethers } from 'ethers';
import { FC } from 'react';
import styled from 'styled-components';
import { BeobleSDK } from '@beoble/js-sdk';
import { Colors } from '../../styles';
import IconButton from '../IconButton';
import { CgClose } from 'react-icons/cg';

/* eslint-disable-next-line */
export interface UserLabelProps {
  display_context: string;
  onClose?: () => void;
}

const Container = styled.div`
  border: 1px solid ${Colors.border.highlight};
  border-radius: 50vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: fit-content;
  padding: 6px 6px 6px 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 8px 8px 0;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  color: ${Colors.text.normal};
  font-size: 14px;
  line-height: 1.5rem;
`;

export const UserLabel: FC<UserLabelProps> = ({ display_context, onClose }) => {
  const truncateDisplayText = (text: string) => {
    if (ethers.utils.isAddress(text))
      return BeobleSDK.utils.truncateString(text);
    return text;
  };

  return (
    <Container>
      <TextContainer>{truncateDisplayText(display_context)}</TextContainer>
      <IconButton size={20} style={{ marginLeft: 4 }} onClick={onClose}>
        <CgClose />
      </IconButton>
    </Container>
  );
};

export default UserLabel;

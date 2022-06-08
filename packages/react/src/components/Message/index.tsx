import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Colors, FontWeights } from '../../styles';
import Avatar from '../Avatar';

/* eslint-disable-next-line */
export interface MessageProps {
  isMine: boolean;
  isFollowing: boolean;
  content: string;
}

const MessageContainer = styled.div<{ isMine: boolean }>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  display: flex;
  flex-direction: row;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
`;

const ProfileContainer = styled.div`
  width: 32px;
`;

const MessageContentContainer = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 4px;
  align-items: ${({ isMine }) => (isMine ? 'end' : 'start')};
  max-width: 70%;
`;

const MessageInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
  padding: 0px 4px;
  width: 100%;
`;

const MessageBox = styled.div<{ isMine: boolean }>`
  ${({ isMine }) => (isMine ? MyMessage : OthersMessage)}
  font-size: 14px;
  padding: 8px 12px;
  width: fit-content;
  min-width: 10px;
`;

const MyMessage = css`
  background-color: ${Colors.background.messageTint};
  color: ${Colors.text.white};
  border-radius: 10px 0px 10px 10px;
`;

const OthersMessage = css`
  background-color: ${Colors.background.noneTintHover};
  color: ${Colors.text.normal};
  border-radius: 0px 10px 10px 10px;
`;

const UserName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: ${FontWeights.bold};
  margin-right: 8px;
`;

const TimePhrase = styled.time`
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  color: ${Colors.text.lowEmphasis};
`;

export const Message: FC<MessageProps> = ({ isMine, isFollowing, content }) => {
  return (
    <MessageContainer {...{ isMine }}>
      {!isMine && (
        <ProfileContainer>
          {!isFollowing && (
            <Avatar size={32} profileImg={''} status={'online'} account={''} />
          )}
        </ProfileContainer>
      )}
      <MessageContentContainer {...{ isMine }}>
        {!isFollowing && (
          <MessageInfoContainer>
            <UserName>You</UserName>
            <TimePhrase>Just now</TimePhrase>
          </MessageInfoContainer>
        )}
        <MessageBox {...{ isMine }}>{content}</MessageBox>
      </MessageContentContainer>
    </MessageContainer>
  );
};

export default Message;

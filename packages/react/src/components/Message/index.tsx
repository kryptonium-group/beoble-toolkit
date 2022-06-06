import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Colors, FontWeights } from '../../styles';
import Avatar from '../Avatar';

/* eslint-disable-next-line */
export interface MessageProps {
  isMine: boolean;
  isFollowing: boolean;
}

const MessageContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  display: flex;
  flex-direction: row;
`;

const ProfileContainer = styled.div``;

const MessageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  width: 80%;
  min-width: 160px;
`;

const MessageInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
  padding: 0px 4px;
`;

const MessageBox = styled.div<{ isMine: boolean }>`
  ${({ isMine }) => (isMine ? MyMessage : OthersMessage)}
  font-size: 14px;
  padding: 8px 12px;
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
`;

const TimePhrase = styled.time`
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  color: ${Colors.text.lowEmphasis};
`;

export const Message: FC<MessageProps> = ({ isMine, isFollowing }) => {
  return (
    <MessageContainer>
      {!isMine && !isFollowing && (
        <ProfileContainer>
          <Avatar size={32} profileImg={''} status={'online'} account={''} />
        </ProfileContainer>
      )}
      <MessageContentContainer>
        {!isFollowing && (
          <MessageInfoContainer>
            <UserName>You</UserName>
            <TimePhrase>Just now</TimePhrase>
          </MessageInfoContainer>
        )}
        <MessageBox {...{ isMine }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </MessageBox>
      </MessageContentContainer>
    </MessageContainer>
  );
};

export default Message;

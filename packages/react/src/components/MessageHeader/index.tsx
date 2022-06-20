import styled, { css } from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { CgArrowsExpandRight, CgClose } from 'react-icons/cg';
import IconButton from '../IconButton';
import Avatar from '../Avatar';
import { Status } from '../OnlineStatus';
import { FC, MouseEventHandler, MouseEvent } from 'react';
import { Colors, FontWeights, Truncate } from '../../styles';

export interface MessageHeaderProps {
  profileImage?: string;
  status: Status;
  onMinimizeButtonClick?: () => void;
  onHeaderClick?: () => void;
  onNewChatRoomClick?: () => void;
  isMinimized: boolean;
  account: string;
}

const StyledMessageHeader = styled.header`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 8px;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #00000014;

  min-height: 48px;
  background-clip: padding-box;
  border-radius: 0.8rem 0.8rem 0 0;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &:hover {
    background-color: #f9fafb;
  }
`;

/**
 * no idea why linked in has this element
 */
const BadgeContainer = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px;
  flex-grow: 1;
  height: 100%;
  margin-right: 4px;
  cursor: pointer;
`;

const HeaderTitle = styled.span`
  color: #000000e6;
  font-size: 15px;
  font-weight: 600;
  margin-left: 8px;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MessageHeader: FC<MessageHeaderProps> = ({
  profileImage,
  status,
  onMinimizeButtonClick,
  onHeaderClick,
  onNewChatRoomClick,
  isMinimized,
  account,
}) => {
  const handleMoreButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleNewMessageButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onNewChatRoomClick && onNewChatRoomClick();
  };

  return (
    <StyledMessageHeader onClick={onHeaderClick}>
      <ProfileContainer>
        <Avatar
          size={32}
          profileImg={profileImage}
          status={status}
          account={account}
        />
        <HeaderTitle>Messaging</HeaderTitle>
      </ProfileContainer>
      <ControlsContainer>
        <IconButton size={32} onClick={handleMoreButtonClick}>
          <MdMoreHoriz />
        </IconButton>
        <IconButton size={32} onClick={handleNewMessageButtonClick}>
          <BiEdit />
        </IconButton>
        <IconButton size={32} onClick={onMinimizeButtonClick}>
          {isMinimized ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
        </IconButton>
      </ControlsContainer>
    </StyledMessageHeader>
  );
};

export default MessageHeader;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewMessageHeaderProps {}

export const NewMessageHeader: FC<NewMessageHeaderProps> = () => {
  return (
    <StyledMessageHeader>
      <ProfileContainer>
        <HeaderTitle>New message</HeaderTitle>
      </ProfileContainer>
      <ControlsContainer>
        <IconButton size={32}>
          <CgArrowsExpandRight />
        </IconButton>
        <IconButton size={32}>
          <CgClose />
        </IconButton>
      </ControlsContainer>
    </StyledMessageHeader>
  );
};

export interface ChatHeaderProps {
  profileImage?: string;
  status: Status;
  account: string;
  userName?: string;
  isMinimized: boolean;
  onHeaderClick?: MouseEventHandler<any>;
  onClose?: MouseEventHandler<any>;
}

const TitleContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
  margin-left: 8px;
  padding-left: 4px;

  ${Truncate}
`;

const UserName = styled.a<{ isMinimized: boolean }>`
  color: ${Colors.text.normal};
  font-weight: ${FontWeights.bold};
  text-decoration: none;

  ${({ isMinimized }) => !isMinimized && linkDecoration}
`;

const linkDecoration = css`
  &:hover {
    color: ${Colors.text.action};
    text-decoration: underline;
  }
`;

const StatusDiv = styled.div`
  ${Truncate}
  color: ${Colors.text.normal};
  font-size: 12px;
`;

export const ChatHeader: FC<ChatHeaderProps> = ({
  profileImage,
  status,
  account,
  userName,
  isMinimized,
  onHeaderClick,
  onClose,
}) => {
  const handleCloseClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose && onClose(e);
  };

  return (
    <StyledMessageHeader onClick={onHeaderClick}>
      <ProfileContainer>
        <Avatar
          size={32}
          profileImg={profileImage}
          status={status}
          account={account}
        />
        <TitleContainer>
          <UserName {...{ isMinimized }}>{userName ?? account}</UserName>
          {!isMinimized && <StatusDiv>{status}</StatusDiv>}
        </TitleContainer>
      </ProfileContainer>
      <ControlsContainer>
        {!isMinimized && (
          <>
            <IconButton size={32}>
              <MdMoreHoriz />
            </IconButton>
            <IconButton size={32}>
              <CgArrowsExpandRight />
            </IconButton>
          </>
        )}
        <IconButton size={32} onClick={handleCloseClick}>
          <CgClose />
        </IconButton>
      </ControlsContainer>
    </StyledMessageHeader>
  );
};

export interface CreateChatRoomHeaderProps {
  onClose: () => void;
}

export const CreateChatRoomHeader: FC<CreateChatRoomHeaderProps> = ({
  onClose,
}) => {
  return (
    <StyledMessageHeader>
      <ProfileContainer>
        <TitleContainer>
          <HeaderTitle>Invite</HeaderTitle>
        </TitleContainer>
      </ProfileContainer>
      <ControlsContainer>
        <IconButton size={32} onClick={onClose}>
          <CgClose />
        </IconButton>
      </ControlsContainer>
    </StyledMessageHeader>
  );
};

import { FC } from 'react';
import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';
import { IUser } from '@beoble/js-sdk';
import { useBeoble, useENS } from '../../hooks';
import { Colors, Truncate } from '../../styles';
import { Appear } from '../../styles/commons';
import Avatar from '../Avatar';

/* eslint-disable-next-line */
export interface UserListItemProps {
  user: IUser;
  padding?: string | number;
  onClick?: () => void;
  hasCheckBox?: boolean;
}

const Container = styled.div<SpaceProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-duration: 300ms;
  animation-name: ${Appear};
  ${space}

  &:hover {
    background-color: ${Colors.background.noneTintHover};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DisplayName = styled.span`
  margin: 0px;
  margin-left: 8px;
  padding: 0;
  flex: 1;
  ${Truncate}
`;

const CheckBoxContainer = styled.div``;

export const UserListItem: FC<UserListItemProps> = ({
  user,
  padding,
  onClick,
  hasCheckBox,
}) => {
  const { provider } = useBeoble();
  const { ENSName, ENSAvatar } = useENS(provider, user.wallets[0]);

  return (
    <Container padding={padding} {...{ onClick }}>
      <ProfileContainer>
        <Avatar
          account={user.wallets[0]}
          profileImg={user.representative_media_url[0] ?? ENSAvatar}
          size={30}
        />
        <DisplayName>
          {user.display_name ?? (!ENSName ? user.wallets[0] : ENSName)}
        </DisplayName>
      </ProfileContainer>
      {hasCheckBox && <CheckBoxContainer></CheckBoxContainer>}
    </Container>
  );
};

export default UserListItem;

import { FC, useState } from 'react';
import styled from 'styled-components';
import { SpaceProps, space } from 'styled-system';
import { IUser } from '@beoble/js-sdk';
import { useBeoble, useENS } from '../../hooks';
import { Colors, handleSize, Size, Truncate } from '../../styles';
import { Appear } from '../../styles/commons';
import Avatar from '../Avatar';
import CheckBox from '../CheckBox';

/* eslint-disable-next-line */
export interface UserListItemProps {
  user: IUser;
  padding?: string | number;
  size?: Size;
  onClick?: () => void;
  hasCheckBox?: boolean;
  checked?: boolean;
  onCheckChange?: (value: boolean) => void;
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
  size = 'md',
  onClick,
  hasCheckBox,
  checked,
  onCheckChange,
}) => {
  const { provider } = useBeoble();
  const { ENSName, ENSAvatar } = useENS(provider, user.wallets[0]);
  const [clicked, setClicked] = useState(checked ?? false);

  const handleChange = (value: boolean) => {
    setClicked(value);
    onCheckChange && onCheckChange(value);
  };

  const handleClick = () => {
    setClicked(!clicked);
    onClick && onClick();
  };

  return (
    <Container padding={padding} onClick={handleClick}>
      <ProfileContainer>
        <Avatar
          account={user.wallets[0]}
          profileImg={user.representative_media_url[0] ?? ENSAvatar}
          size={handleSize(size, [48, 36, 20])}
        />
        <DisplayName style={{ fontSize: handleSize(size, [20, 16, 14]) }}>
          {user.display_name ?? (!ENSName ? user.wallets[0] : ENSName)}
        </DisplayName>
      </ProfileContainer>
      {hasCheckBox && (
        <CheckBoxContainer>
          <CheckBox
            size={20}
            value={checked ?? clicked}
            onChange={handleChange}
          />
        </CheckBoxContainer>
      )}
    </Container>
  );
};

export default UserListItem;

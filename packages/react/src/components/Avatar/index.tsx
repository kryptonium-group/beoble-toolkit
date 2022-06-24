import styled from 'styled-components';
import { SizeCss, SizeProps } from '../../styles';
import Identication from '../Identication';
import OnlineStatus, { Status } from '../OnlineStatus';

/* eslint-disable-next-line */
export interface AvatarProps extends SizeProps {
  status?: Status;
  profileImg?: string;
  account: string;
  onClick?: () => void;
}

const AvatarContainer = styled.div`
  position: relative;
  background-color: #7c7c7c;
  ${SizeCss}
  border-radius: 50%;
  cursor: pointer;
`;

const ImageContainer = styled.img<SizeProps>`
  background-size: cover;
  background-clip: content-box;
  border-radius: 50%;
  border: none;
  box-sizing: border-box;
  ${SizeCss}
`;

const StatusContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const TestDefaultImage =
  'https://180dc.org/wp-content/uploads/2016/08/default-profile-300x284.png';

export function Avatar({
  size,
  status,
  profileImg,
  account = '',
  onClick,
}: AvatarProps) {
  return (
    <AvatarContainer size={size} {...{ onClick }}>
      {profileImg ? (
        <ImageContainer size={size} src={TestDefaultImage} />
      ) : (
        <Identication diameter={size ?? 16} account={account} />
      )}

      {status && (
        <StatusContainer>
          <OnlineStatus size={size ? size / 4 : size} status={status} />
        </StatusContainer>
      )}
    </AvatarContainer>
  );
}

export default Avatar;

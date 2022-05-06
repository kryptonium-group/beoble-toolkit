import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import {
  PROFILE_DRAWER_CLASSNAME,
  PROFILE_MODAL_CLASSNAME,
} from '../../constants';
import ProfileDrawer from './Drawer';
import ProfileModal from './Modal';
import StatusButton from './StatusButton';
import { ProfileType } from './type';

/* eslint-disable-next-line */
export interface ProfileProps {
  detailElement: ProfileType;
}

const StyledProfile = styled.div``;

export function Profile({ detailElement }: ProfileProps) {
  const renderModal = () => {
    const el = document.createElement('div');
    el.id = PROFILE_MODAL_CLASSNAME;
    getDocumentRoot().appendChild(el);
    // apply this when @types/react-dom 18.1.0 come out
    // https://reactjs.org/link/switch-to-createroot
    // const root = createRoot(el);

    ReactDOM.render(
      <ProfileModal />,
      document.getElementById(PROFILE_MODAL_CLASSNAME)
    );
  };

  const renderDrawer = () => {
    const el = document.createElement('div');
    el.id = PROFILE_DRAWER_CLASSNAME;
    getDocumentRoot().appendChild(el);

    ReactDOM.render(
      <ProfileDrawer />,
      document.getElementById(PROFILE_DRAWER_CLASSNAME)
    );
  };

  const getDocumentRoot = () => {
    const nextBody = document.getElementById('__next');
    const reactBody = document.getElementById('root');
    return nextBody ?? reactBody ?? document.body;
  };

  useEffect(() => {
    detailElement === 'drawer' ? renderDrawer() : renderModal();
  }, [detailElement]);

  return (
    <StyledProfile>
      <StatusButton />
    </StyledProfile>
  );
}

export default Profile;

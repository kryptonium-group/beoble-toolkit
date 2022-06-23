import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  PROFILE_DRAWER_CLASSNAME,
  PROFILE_MODAL_CLASSNAME,
} from '../../constants';
import ProfileDrawer from '../../components/ProfileDrawer';
import { ProfileModal } from '../../components/ProfileModal';
import StatusButton from '../../components/StatusButton';
import { ProfileType } from './type';
import { useDelayOpen } from '../../hooks/useDelayOpen';
import { useBeobleModal } from '../../hooks';

/* eslint-disable-next-line */
export interface ProfileProps {
  detailElement: ProfileType;
  hasButton?: boolean;
}

const StyledProfile = styled.div``;

export const Profile: FC<ProfileProps> = ({
  detailElement,
  hasButton = true,
}) => {
  const { isOpen, toggle, render, close } = useBeobleModal();

  /*
  const renderModal = () => {
    const modalContainer = document.createElement('div');
    modalContainer.id = PROFILE_MODAL_CLASSNAME;
    getDocumentRoot().appendChild(modalContainer);
    const root = createRoot(modalContainer);
    root.render(<ProfileModal isOpen />);
  };

  const renderDrawer = () => {
    const drawerContainer = document.createElement('div');
    drawerContainer.id = PROFILE_DRAWER_CLASSNAME;
    getDocumentRoot().appendChild(drawerContainer);
    const root = createRoot(drawerContainer);
    root.render(<ProfileDrawer />);
  };
  
  const getDocumentRoot = () => {
    const nextBody = document.getElementById('__next');
    const reactBody = document.getElementById('root');
    return nextBody ?? reactBody ?? document.body;
  };
  */

  useEffect(() => {
    //  detailElement === 'drawer' ? renderDrawer() : renderModal();
  }, [detailElement]);

  return (
    <StyledProfile>
      {hasButton && <StatusButton onClick={toggle} />}
      {render && <ProfileModal isOpen={isOpen} close={close} />}
    </StyledProfile>
  );
};

export default Profile;

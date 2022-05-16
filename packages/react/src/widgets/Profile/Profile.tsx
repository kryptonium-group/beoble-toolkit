import { useEffect, useState } from 'react';
import { hydrate } from 'react-dom';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import {
  PROFILE_DRAWER_CLASSNAME,
  PROFILE_MODAL_CLASSNAME,
} from '../../constants';
import { useDelay } from '../../hooks/useDelayMount';
import ProfileDrawer from './Drawer';
import ProfileModal from './Modal';
import StatusButton from './StatusButton';
import { ProfileType } from './type';

/* eslint-disable-next-line */
export interface ProfileProps {
  detailElement: ProfileType;
}

const StyledProfile = styled.div``;

export const Profile = ({ detailElement }: ProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  useEffect(() => {
    //  detailElement === 'drawer' ? renderDrawer() : renderModal();
  }, [detailElement]);

  return (
    <StyledProfile>
      <StatusButton
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      />
      {isModalOpen && <ProfileModal close={closeModal} />}
    </StyledProfile>
  );
};

export default Profile;

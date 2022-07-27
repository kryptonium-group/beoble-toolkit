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
import { useDelayOpen } from '../../hooks/commons/useDelayOpen';
import { useBeobleModal } from '../../hooks';
import { SearchModal } from '../../components/SearchModal';
import NftModal from '../../components/NftModal';

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
  const {
    isOpen,
    toggle,
    render,
    close,
    isSearchModalOpen,
    renderSearchModal,
    closeSearchModal,
    isNftModalOpen,
    renderNftModal,
    closeNftModal,
  } = useBeobleModal();

  useEffect(() => {
    //  detailElement === 'drawer' ? renderDrawer() : renderModal();
  }, [detailElement]);

  return (
    <StyledProfile>
      {hasButton && <StatusButton onClick={toggle} />}
      {render && <ProfileModal isOpen={isOpen} close={close} />}
      {renderSearchModal && (
        <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
      )}

      {renderNftModal && (
        <NftModal onClose={closeNftModal} isOpen={isNftModalOpen} />
      )}
    </StyledProfile>
  );
};

export default Profile;

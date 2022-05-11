import React from 'react';
import styled, { css } from 'styled-components';

/* eslint-disable-next-line */
export interface ProfileModalProps {}

const flexStretch = css`
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  flex-shrink: 0;
  flex-direction: column;
  flex-basis: auto;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
`;

const ProfileModalContainer = styled.div`
  position: relative;
  -webkit-box-flex: 1;
  flex-grow: 1;
  padding: 16px;
  margin: 16px;
  border-radius: 24px;
  box-shadow: rgb(27 32 50 / 12%) 0px 10px 40px;
  background-color: #333;
  color: #fff;
  ${flexStretch}
`;

const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  vertical-align: inherit;
`;

const noBorder = css`
  border-width: 0px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
`;

const ProfileInfoContainer = styled.div`
  ${noBorder}
  ${flexStretch}
  padding-left: 12px;
  padding-right: 12px;
`;
const MenuContainer = styled.div`
  ${noBorder}
  ${flexStretch}
  margin-top: 16px;
`;
const Footer = styled.div`
  margin-top: auto;
  ${noBorder}
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  ${flexStretch};
`;

const ProfileModal = () => {
  return (
    <ProfileModalContainer>
      <ModalContent>
        <ProfileInfoContainer></ProfileInfoContainer>
        <MenuContainer></MenuContainer>
        <Footer></Footer>
      </ModalContent>
    </ProfileModalContainer>
  );
};

export default ProfileModal;

import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  RiUserReceived2Line,
  RiUserShared2Line,
  RiChat3Line,
  RiArrowDownSLine,
  RiCloseFill,
} from 'react-icons/ri';
import { truncateString } from '../../../../../dist/packages/js-sdk/src/util';
import Button from '../../components/Button';
import Identication from '../../components/Identication';
import useBeoble from '../../hooks/useBeoble/useBeoble';

/* eslint-disable-next-line */
export interface ProfileModalProps {
  isOpen?: boolean;
  close?: () => void;
}

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

const noBorder = css`
  border-width: 0px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
`;

const Sidebar = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

const Blur = keyframes`
  0% {
    background-color: transparent;
  }
   100% {
     background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
   }
`;

const Container = styled.div`
  ${flexStretch}
  ${noBorder};
  position: fixed;
  z-index: 150;
  inset: 0px;
  overflow-y: auto;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-duration: 300ms;
  animation-name: ${Blur};
`;

const ProfileModalContainer = styled.div`
  ${flexStretch}
  ${noBorder};
  z-index: 151;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100%;
  max-width: 408px;
  min-height: 100%;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-duration: 300ms;
  animation-name: ${Sidebar};
`;

const ProfileModalCard = styled.div`
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

const OutlinedButton = styled(Button)`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: row nowrap;
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.08);
  line-height: 48px;
  height: 48px;
  padding-left: 26.4px;
  padding-right: 26.4px;
  min-width: 192px;
  border: 1px solid transparent;
  border-radius: 48px;
  font-size: 14px;
  font-weight: 900;
  font-family: inherit;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;
  cursor: pointer;
  border-color: rgba(255, 255, 255, 0.1);
  color: rgb(255, 255, 255);
  background: transparent;
  appearance: button;

  :hover {
    background: transparent;
    color: rgb(255, 255, 255);
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

const MenuButton = styled(Button)`
  cursor: pointer;
  color: rgb(255, 255, 255);
  transition: all 0.15s ease-in-out 0s;
  text-align: left;
  min-height: 35px;
  padding: 12px 16px;
  margin: 0px 12px;
  border-radius: 8px;
  background: transparent;
  border: none;
  line-height: normal;
  vertical-align: inherit;
  overflow: visible;

  :hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: rgb(255, 255, 255);
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
`;

const MEnuItemName = styled.span`
  font-family: inherit;
  font-weight: 700;
  margin-left: 12px;
  margin-right: 4px;
  font-size: 15px;
  vertical-align: inherit;
`;

const AddressContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
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
  ${noBorder}
`;

const AddressProfileButton = styled(Button)`
  vertical-align: inherit;
  color: inherit;
  overflow: visible;
  background: transparent;
  border: none;
  cursor: pointer;
  line-height: normal;
  padding: 12px;
`;

const AddressProfileDiv = styled.div`
  ${noBorder}
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 0 auto;
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  display: flex;
`;

const AddressDiv = styled.div`
  ${noBorder}
  justify-content: stretch;
  ${flexStretch}
  flex-shrink: 1;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-left: 12px;
  text-align: start;
`;

const AddressSpan = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
  vertical-align: inherit;
`;

const ProfileSpan = styled.span`
  font-family: inherit;
  font-weight: inherit;
  font-size: 13px;
  vertical-align: inherit;
  margin-top: 2px;
  color: rgba(140, 140, 140, 0.6);
`;

const WalletInfoContainer = styled.div`
  ${flexStretch}
  ${noBorder}
  margin-top: 16px;
  padding-left: 8px;
  padding-right: 8px;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const WalletConnectStatus = styled.span`
  font-family: inherit;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  vertical-align: inherit;
`;

const ManageWalletLink = styled.a`
  font-family: inherit;
  font-weight: 700;
  font-size: 15px;
  vertical-align: inherit;
  transition: all 0.15s ease-in-out 0s;
  text-decoration: none;
  color: rgb(45, 129, 255);
  cursor: pointer;

  :hover {
    color: rgb(255, 255, 255);
  }
`;

const MenuArrow = styled(RiArrowDownSLine)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 150ms ease;
`;

const CloseButton = styled(Button)`
  ${noBorder}
  position: absolute;
  top: 16px;
  right: 16px;
  height: 34px;
  width: 34px;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 0.15s ease-in-out 0s;
  border-radius: 34px;
  transform-origin: center center;
  vertical-align: inherit;
  padding: 0px;
  overflow: visible;
`;

const ProfileModal = ({ isOpen, close }: ProfileModalProps) => {
  const [isChattingMenuOpen, setIsChattingMenuOpen] = useState(false);
  const [isFollowersMenuOpen, setIsFollowersMenuOpen] = useState(false);
  const [isFollowingMenuOpen, setIsFollowingMenuOpen] = useState(false);

  const { address, ENSName, initialize, isInitialized } = useBeoble();

  const handleClickChattingMenu = () => {
    setIsChattingMenuOpen(!isChattingMenuOpen);
  };

  const handleClickFollowersMenu = () => {
    setIsFollowersMenuOpen(!isFollowersMenuOpen);
  };

  const handleClickFollowingMenu = () => {
    setIsFollowingMenuOpen(!isFollowingMenuOpen);
  };

  useEffect(() => {
    if (!isInitialized) initialize();
  }, []);

  return (
    <Container onClick={close}>
      <ProfileModalContainer>
        <ProfileModalCard>
          <ModalContent>
            <ProfileInfoContainer>
              <AddressContainer>
                <AddressProfileButton>
                  <AddressProfileDiv>
                    <Identication diameter={36} account={address ?? ''} />
                    <AddressDiv>
                      <AddressSpan>{ENSName ?? 'undefined'}</AddressSpan>
                      <ProfileSpan>
                        {truncateString(address ?? ' ', 16, 4, 4)}
                      </ProfileSpan>
                    </AddressDiv>
                  </AddressProfileDiv>
                </AddressProfileButton>
                <WalletInfoContainer>
                  <WalletConnectStatus>Connected</WalletConnectStatus>
                  <ManageWalletLink>Edit Profile</ManageWalletLink>
                </WalletInfoContainer>
              </AddressContainer>
            </ProfileInfoContainer>
            <MenuContainer>
              <MenuButton type="button" onClick={handleClickFollowersMenu}>
                <MenuItemContainer>
                  <RiUserReceived2Line size={20} />
                  <MEnuItemName>Followers</MEnuItemName>
                  <MenuArrow isOpen={isFollowersMenuOpen} size={16} />
                </MenuItemContainer>
              </MenuButton>
              <MenuButton type="button" onClick={handleClickFollowingMenu}>
                <MenuItemContainer>
                  <RiUserShared2Line size={20} />
                  <MEnuItemName>Following</MEnuItemName>
                  <MenuArrow isOpen={isFollowingMenuOpen} size={16} />
                </MenuItemContainer>
              </MenuButton>
              <MenuButton type="button" onClick={handleClickChattingMenu}>
                <MenuItemContainer>
                  <RiChat3Line size={20} />
                  <MEnuItemName>Chattings</MEnuItemName>
                  <MenuArrow isOpen={isChattingMenuOpen} size={16} />
                </MenuItemContainer>
              </MenuButton>
            </MenuContainer>
            <Footer>
              <OutlinedButton>Sign out</OutlinedButton>
            </Footer>
          </ModalContent>
          <CloseButton onClick={close}>
            <RiCloseFill size={16} />
          </CloseButton>
        </ProfileModalCard>
      </ProfileModalContainer>
    </Container>
  );
};

export default ProfileModal;

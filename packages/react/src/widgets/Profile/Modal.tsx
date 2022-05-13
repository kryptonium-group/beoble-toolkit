import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../../components/Button';
import Identication from '../../components/Identication';
import useBeoble from '../../hooks/useBeoble/useBeoble';

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

const noBorder = css`
  border-width: 0px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
`;

const ProfileModalContainer = styled.div`
  ${flexStretch}
  ${noBorder};
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100%;
  max-width: 408px;
  min-height: 100%;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-duration: 300ms;
  animation-name: iEEIEZ;
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

const ProfileModal = () => {
  const { address } = useBeoble();

  return (
    <ProfileModalContainer>
      <ProfileModalCard>
        <ModalContent>
          <ProfileInfoContainer>
            <AddressContainer>
              <AddressProfileButton>
                <AddressProfileDiv>
                  <Identication diameter={36} account={address ?? ''} />
                  <AddressDiv>
                    <AddressSpan>{address ?? ''}</AddressSpan>
                    <ProfileSpan>View Profile</ProfileSpan>
                  </AddressDiv>
                </AddressProfileDiv>
              </AddressProfileButton>
              <WalletInfoContainer>
                <WalletConnectStatus>Connected</WalletConnectStatus>
                <ManageWalletLink>Manage wallets</ManageWalletLink>
              </WalletInfoContainer>
            </AddressContainer>
          </ProfileInfoContainer>
          <MenuContainer>
            <MenuButton type="button">Edit profile</MenuButton>
            <MenuButton type="button">Friend List</MenuButton>
          </MenuContainer>
          <Footer>
            <OutlinedButton>Sign out</OutlinedButton>
          </Footer>
        </ModalContent>
      </ProfileModalCard>
    </ProfileModalContainer>
  );
};

export default ProfileModal;

import { RiArrowDownSLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';
import { Appear, flexStretch, noBorder } from '../../styles/commons';
import Button from '../Button';

export const OutlinedButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.08);
  line-height: 48px;
  height: 48px;
  padding-left: 26px;
  padding-right: 26px;
  min-width: 192px;
  border: 1px solid transparent;
  border-radius: 48px;
  border-color: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  font-weight: 900;
  font-family: inherit;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;
  cursor: pointer;
  color: rgb(255, 255, 255);
  appearance: button;
  background: transparent;

  :hover {
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-bottom: 20px;
  vertical-align: inherit;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const InputContainer = styled.div`
  box-sizing: border-box;
  margin-bottom: 24px;
  padding: 0 12px;
  font-size: 13px;
  color: rgb(255, 255, 255);
`;

export const ProfileImageContainer = styled(InputContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EditProfileTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 0px;
  color: rgb(255, 255, 255);
`;

export const TitleContainer = styled.div`
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 24px;
`;

export const SaveButton = styled(OutlinedButton)`
  background-color: rgb(32, 129, 226);
  border: 1px solid rgb(32, 129, 226);

  &:hover {
    background-color: rgb(66, 160, 255);
    border: 1px solid rgb(66, 160, 255);
    color: rgb(255, 255, 255);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #575757;
      border: 1px solid #575757;
      cursor: auto;

      &:hover {
        background-color: #575757;
        border: 1px solid #575757;
      }
    `}
`;

export const InputTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

export const InputTitle = styled.label`
  color: rgb(229, 232, 235);
  font-weight: 600;
  font-size: 16px;
  box-sizing: border-box;
`;

export const Footer = styled.div`
  margin-top: auto;
  ${noBorder}
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  ${flexStretch};
`;

export const ProfileInfoContainer = styled.div`
  ${noBorder}
  ${flexStretch}
  padding-left: 12px;
  padding-right: 12px;
`;

export const MenuContainer = styled.div`
  ${noBorder}
  ${flexStretch}
  margin-top: 16px;
`;

export const MenuButton = styled(Button)`
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

export const MenuItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
`;

export const MEnuItemName = styled.span`
  font-family: inherit;
  font-weight: 700;
  margin-left: 12px;
  margin-right: 4px;
  font-size: 15px;
  vertical-align: inherit;
`;

export const AddressContainer = styled.div`
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

export const AddressProfileButton = styled(Button)`
  vertical-align: inherit;
  color: inherit;
  overflow: visible;
  background: transparent;
  border: none;
  cursor: pointer;
  line-height: normal;

  padding: 12px;
`;

export const AddressProfileDiv = styled.div`
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

export const AddressDiv = styled.div`
  ${noBorder}
  justify-content: stretch;
  ${flexStretch}
  flex-shrink: 1;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-left: 12px;
  text-align: start;
`;

export const AddressSpan = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
  vertical-align: inherit;
`;

export const ProfileSpan = styled.span`
  font-family: inherit;
  font-weight: inherit;
  font-size: 13px;
  vertical-align: inherit;
  margin-top: 2px;
  color: rgba(140, 140, 140, 0.6);
`;

export const WalletInfoContainer = styled.div`
  ${flexStretch}
  ${noBorder}
  margin-top: 16px;
  padding-left: 8px;
  padding-right: 8px;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

export const WalletConnectStatus = styled.span`
  font-family: inherit;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  vertical-align: inherit;
`;

export const ManageWalletLink = styled.a`
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

export const MenuArrow = styled(RiArrowDownSLine)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 150ms ease;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 12px;
  padding: 0px;
`;

export const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 8px;
  animation: ${Appear};
`;

export const NoResultText = styled.span`
  height: 20px;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

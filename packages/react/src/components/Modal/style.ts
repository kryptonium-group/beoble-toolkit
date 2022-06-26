import styled from 'styled-components';
import { Colors, zIndex } from '../../styles';
import { Appear, flexStretch, noBorder } from '../../styles/commons';

export const Container = styled.div<{ isOpen: boolean }>`
  ${flexStretch}
  ${noBorder};
  position: fixed;
  inset: 0px;
  overflow: hidden;
  transition: all 300ms ease-in-out;
  backdrop-filter: ${({ isOpen }) => (isOpen ? 'blur(10px)' : 'none')};
  background-color: ${({ isOpen }) =>
    isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transperent'};
  z-index: ${zIndex.blur};
`;

export const ChatRoomModalContainer = styled.div<{ isOpen: boolean }>`
  ${flexStretch}
  ${noBorder};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  height: 580px;
  width: 336px;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-duration: 300ms;
  animation-direction: ${({ isOpen }) => (isOpen ? 'normal' : 'reverse')};
  animation-name: ${Appear};
  z-index: ${zIndex.modal};
`;

export const ChatRoomModalCard = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  height: 580px;
  width: 336px;
  background-color: ${Colors.background.white};
  display: flex;
  flex: 0 0 auto;
  max-height: calc(100vh - 100px);
  box-shadow: 0px 0px 0px 1px ${Colors.background.noneTintHover},
    0px 4px 4px ${Colors.background.shadow};
  flex-direction: column;

  transform: translateY(0);
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 167ms;

  border-radius: 0.8rem;

  margin-left: 16px;
  position: absolute;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 12px 20px 0px 20px;
  justify-content: center;
  align-items: center;
`;

export const ScrollableSection = styled.section`
  display: block;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  overflow-y: auto;
  height: inherit;

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${Colors.background.shadow};
  }
`;

export const ContentSection = styled.section`
  display: block;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  height: inherit;

  padding: 20px 0px;
`;

export const TitleContainer = styled.div`
  padding: 12px 20px;
`;

export const UserTypeTitle = styled.span`
  padding: 0;
  margin: 0;
  font-family: inherit;
  color: ${Colors.text.lowEmphasis};
`;

export const FooterContainer = styled.footer`
  border-radius: 10px;
  border-top: solid 1px ${Colors.border.faint};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  background-color: inherit;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
`;

export const UserLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  padding: 20px 20px 0px 20px;
  height: fit-content;
  flex-wrap: wrap;
`;

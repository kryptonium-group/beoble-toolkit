import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { RiCloseFill } from 'react-icons/ri';
import { MdArrowBack } from 'react-icons/md';
import Button from '../Button';
import { EditProfile, ProfileContent } from './Contents';
import useBeobleModal from '../../hooks/useBeoble/useBeobleModal';

/* eslint-disable-next-line */
export interface ProfileModalProps {
  isOpen: boolean;
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

const SidebarDisappear = keyframes`
  0% {
    
    transform: translateX(0px);
    opacity: 1;
  }

  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const Container = styled.div<{ isOpen: boolean }>`
  ${flexStretch}
  ${noBorder};
  position: fixed;
  inset: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 300ms ease-in-out;
  backdrop-filter: ${({ isOpen }) => (isOpen ? 'blur(10px)' : 'none')};
  background-color: ${({ isOpen }) =>
    isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transperent'};
`;

const ProfileModalContainer = styled.div<{ isOpen: boolean }>`
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
  animation-name: ${({ isOpen }) => (isOpen ? Sidebar : SidebarDisappear)};
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

const ModalControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
`;

const ControlButton = styled(Button)`
  ${noBorder}
  height: 34px;
  width: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-in-out 0s;
  border-radius: 34px;
  transform-origin: center center;
  vertical-align: inherit;
  padding: 0px;
  overflow: visible;
`;

export const ProfileModal = ({ isOpen, close }: ProfileModalProps) => {
  const { route, popRoute } = useBeobleModal();

  const handleBlockParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    console.log(route);
  }, [route]);

  return (
    <Container onClick={close} isOpen={isOpen}>
      <ProfileModalContainer
        isOpen={isOpen}
        onClick={(e) => handleBlockParentClick(e)}
      >
        <ProfileModalCard>
          <ModalControlContainer>
            {route.length > 1 ? (
              <ControlButton onClick={popRoute}>
                <MdArrowBack size={16} />
              </ControlButton>
            ) : (
              <div />
            )}
            <ControlButton onClick={close}>
              <RiCloseFill size={16} />
            </ControlButton>
          </ModalControlContainer>
          {route.at(-1) === 'edit' ? <EditProfile /> : <ProfileContent />}
        </ProfileModalCard>
      </ProfileModalContainer>
    </Container>
  );
};

export default ProfileModal;

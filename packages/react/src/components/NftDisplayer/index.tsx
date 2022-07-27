import styled from 'styled-components';
import { INFT } from '@beoble/js-sdk';
import { FC, useState } from 'react';
import { Colors } from '../../styles';

/* eslint-disable-next-line */
export interface NftDisplayerProps {
  nft: INFT;
  onClick?: () => void;
  clicked: boolean;
}

const DisplayerContainer = styled.div<{ clicked: boolean }>`
  width: calc(50% - 5px);
  aspect-ratio: 1;
  flex-basis: auto;
  border: 6px solid
    ${({ clicked }) => (clicked ? Colors.text.action : 'rgb(255, 255, 255)')};
  box-shadow: rgb(0 0 0 / 8%) 0px 5px 20px 0px;
  border-radius: 16px;
  position: relative;
  z-index: 1;
  background: rgb(255, 255, 255);
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out 0s;
  margin-bottom: 10px;

  &:hover {
    background: rgb(22 22 26 / 8%);
    box-shadow: rgb(22 22 26 / 20%) 0px 5px 20px 0px;
  }
`;

const NftCover = styled.div``;

const NftImg = styled.img`
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Badge = styled.div`
  position: absolute;
  bottom: -10px;
  right: 0;
`;

const ChainImg = styled.img`
  width: 50px;
`;

export const NftDisplayer: FC<NftDisplayerProps> = ({
  nft,
  onClick,
  clicked = false,
}) => {
  return (
    <DisplayerContainer {...{ clicked, onClick }}>
      <NftImg src={nft.image_url} loading="lazy" />
    </DisplayerContainer>
  );
};

export default NftDisplayer;

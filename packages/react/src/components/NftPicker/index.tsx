import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { SizeProps } from '../../styles';
import { Identication } from '../Identication';
import { useBeoble, useBeobleModal } from '../../hooks';
import {
  HoverContainer,
  ImageContainer,
  PickerContainer,
  PickerImage,
} from './style';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface NftPickerProps extends SizeProps {
  currentProfileImage?: string;
}

export function NftPicker({ size = 150, currentProfileImage }: NftPickerProps) {
  const { account, user } = useBeoble();
  const { openNftModal, setSelectedNft } = useBeobleModal();

  useEffect(() => {
    return () => setSelectedNft(undefined);
  }, []);

  return (
    <PickerContainer size={size}>
      <HoverContainer onClick={openNftModal}>
        <MdEdit color="#fff" size={size / 6} />
      </HoverContainer>
      <ImageContainer size={size}>
        {currentProfileImage ? (
          <PickerImage src={currentProfileImage} />
        ) : account ? (
          <Identication diameter={size} account={account?.address ?? ''} />
        ) : (
          <PickerImage src="https://storage.googleapis.com/opensea-static/opensea-profile/11.png" />
        )}
      </ImageContainer>
    </PickerContainer>
  );
}

export default NftPicker;

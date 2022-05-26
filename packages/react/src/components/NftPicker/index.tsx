import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { SizeProps } from '../../styles';
import { Identication } from '../Identication';
import { useBeoble } from '../../hooks';
import {
  HoverContainer,
  ImageContainer,
  PickerContainer,
  PickerImage,
} from './style';

/* eslint-disable-next-line */
export interface NftPickerProps extends SizeProps {}

export function NftPicker({ size = 150 }: NftPickerProps) {
  const { address } = useBeoble();

  return (
    <PickerContainer size={size}>
      <HoverContainer>
        <MdEdit color="#fff" size={size / 6} />
      </HoverContainer>
      <ImageContainer size={size}>
        {address ? (
          <Identication diameter={size} account={address} />
        ) : (
          <PickerImage src="https://storage.googleapis.com/opensea-static/opensea-profile/11.png" />
        )}
      </ImageContainer>
    </PickerContainer>
  );
}

export default NftPicker;

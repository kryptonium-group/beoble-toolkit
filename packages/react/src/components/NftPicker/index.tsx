import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { SizeProps } from '../../styles';

/* eslint-disable-next-line */
export interface NftPickerProps extends SizeProps {}

const PickerContainer = styled.div<SizeProps>`
  position: relative;
  box-sizing: border-box;
  max-width: ${({ size }) => size}px;
`;

const HoverContainer = styled.div`
  padding: 4px;
  cursor: pointer;
  position: absolute;
  inset: 0px;
  border: none;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  box-sizing: border-box;
  display: flex;
  opacity: 0;
  background-color: #00000070;
  transition: opacity 150ms ease-out;

  &:hover {
    opacity: 1;
  }
`;

const ImageContainer = styled.div<SizeProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  cursor: pointer;
`;

const PickerImage = styled.img`
  width: 100%;
  height: 100%;
  transition: opacity 400ms ease 0s;
  object-fit: cover;
`;

export function NftPicker({ size = 150 }: NftPickerProps) {
  return (
    <PickerContainer size={size}>
      <HoverContainer>
        <MdEdit color="#fff" size={size / 6} />
      </HoverContainer>
      <ImageContainer size={size}>
        <PickerImage src="https://storage.googleapis.com/opensea-static/opensea-profile/11.png" />
      </ImageContainer>
    </PickerContainer>
  );
}

export default NftPicker;

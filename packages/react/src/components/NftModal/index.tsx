import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NftModalProps {}

const StyledNftModal = styled.div`
  color: pink;
`;

export function NftModal(props: NftModalProps) {
  return (
    <StyledNftModal>
      <h1>Welcome to NftModal!</h1>
    </StyledNftModal>
  );
}

export default NftModal;

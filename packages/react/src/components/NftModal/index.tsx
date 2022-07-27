import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { INFT } from '@beoble/js-sdk';
import { useBeoble, useBeobleModal } from '../../hooks';
import Modal from '../Modal';
import NftDisplayer from '../NftDisplayer';

/* eslint-disable-next-line */
export interface NftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const NftContainer = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  overflow-y: auto;
  min-height: auto;
  flex-wrap: wrap;
`;

export const NftModal: FC<NftModalProps> = ({ isOpen, onClose }) => {
  const [nfts, setNfts] = useState<INFT[]>([]);
  const [selected, setSelected] = useState<INFT>();
  const { Beoble, user } = useBeoble();
  const { setSelectedNft, closeNftModal } = useBeobleModal();

  useEffect(() => {
    return () => {
      setSelected(undefined);
    };
  }, []);

  useEffect(() => {
    getNFTs();
  }, [user]);

  const getNFTs = async () => {
    if (user) {
      const res = await Beoble.user.getNFTs({ user_id: user.id });
      console.log(res);
      setNfts(res.data);
    }
  };

  const handleNftClick = (nft: INFT) => {
    setSelected((prev) =>
      prev ? (isSameNft(prev, nft) ? undefined : nft) : nft
    );
  };

  const isSameNft = (nft: INFT, comp: INFT) => {
    const isSameAddress = nft.token_address === comp.token_address;
    const isSameTokenId = nft.token_id === comp.token_id;
    if (nft.token_id) return isSameTokenId && isSameAddress;
    else return isSameAddress;
  };

  const handleConfirm = () => {
    if (selected) setSelectedNft(selected);
    closeNftModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'Your NFTs'}
      onConfirm={handleConfirm}
      disabled={!(selected !== undefined)}
    >
      <NftContainer>
        {nfts.map((nft) => (
          <NftDisplayer
            nft={nft}
            onClick={() => handleNftClick(nft)}
            key={`${nft.token_address}_${nft.token_id}`}
            clicked={
              selected?.token_address === nft.token_address &&
              selected.token_id === nft.token_id
            }
          />
        ))}
      </NftContainer>
    </Modal>
  );
};

export default NftModal;

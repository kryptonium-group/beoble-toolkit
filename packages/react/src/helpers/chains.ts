import { ChainType } from '@beoble/js-sdk';

export const getChainImagePath = (chain: ChainType) => {
  switch (chain) {
    case 'ETHEREUM':
      return;
    case 'SOLANA':
      return;
    case 'UNKNOWN ':
      return;
    default:
      return;
  }
};

import { ChainType } from '../../types';

export interface WalletPostParams {
  address: string;
  chain_type: ChainType;
}

export interface WalletGetParams {
  wallet_id: string;
}

export interface WalletResposne {
  id: string;
  address: string;
  chain_type: ChainType;
}

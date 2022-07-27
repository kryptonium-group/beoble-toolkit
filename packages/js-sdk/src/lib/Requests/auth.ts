import { ChainType } from '../../types';

export interface IPostLogInBody {
  wallet_address: string;
  signature: string;
  chain_type: ChainType;
}

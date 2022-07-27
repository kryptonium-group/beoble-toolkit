export const Chains = {
  ethereum: 'ETHEREUM',
  bsc: 'BINANCE_SMART_CHAIN',
  terra: 'TERRA',
  polygon: 'POLYGON',
  klaytn: 'KLAYTN',
  fantom: 'FANTOM',
  avax: 'AVALANCHE',
  solana: 'SOLANA',
  harmony: 'HARMONY',
  okex: 'OKEX',
  cronos: 'CRONOS',
  tron: 'TRON',
  heco: 'HECO',
  arbitrium: 'ARBITRUM',
  unknown: 'UNKNOWN ',
} as const;

type ChainKeys = keyof typeof Chains;
export type ChainType = typeof Chains[ChainKeys];

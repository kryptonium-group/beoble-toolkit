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
  okex: 'OKEX_CHAIN',
  cronos: 'CRONOS',
} as const;

type ChainKeys = keyof typeof Chains;
export type ChainType = typeof Chains[ChainKeys];

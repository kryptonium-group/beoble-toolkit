export * from './Chains';

declare global {
  interface Window {
    ethereum: any;
  }
}

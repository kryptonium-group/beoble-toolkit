import { ethers } from 'ethers';

export const isAddress = (value: any) => {
  try {
    return ethers.utils.getAddress(value);
  } catch {
    return false;
  }
};

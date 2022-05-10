import { isAddress } from './web3';

/**
 *
 * @param str
 * @param length
 * @param start
 * @param end
 * @returns
 */
export const truncateString = (
  str: string,
  length = 10,
  start = 3,
  end = 3
) => {
  if (str.length >= length) {
    const startSubString = str.substring(0, start);
    const endSubString = str.substring(str.length - end, str.length);
    return `${startSubString}...${endSubString}`;
  }
  return str;
};

/**
 *
 * @param address
 * @param charLength
 * @returns
 */
export const shortenAddress = (address: string, charLength = 3) => {
  const validAddress = isAddress(address);
  if (!validAddress) {
    throw Error(`Invalid address parameter ${address}.`);
  }
  return truncateString(address, 16, charLength, charLength);
};

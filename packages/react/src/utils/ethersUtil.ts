import { ethers } from 'ethers';

/**
 *
 * @param address
 * @param provider
 * @returns
 */
export const getENSName = async (
  address: string,
  provider?: ethers.providers.BaseProvider | null
) => {
  if (provider && (await isMainnetOrTestnet(provider)))
    return await provider.lookupAddress(address);
  else {
    const defaultProvider = ethers.getDefaultProvider();
    return await defaultProvider.lookupAddress(address);
  }
};

/**
 *
 * @param addressOrEnsName address or ensname
 * @param provider (Optional) if provider is not provided, default provider from ethers will be used.
 * @returns avatar url if there is any, or null
 */
export const getENSAvatar = async (
  addressOrEnsName: string,
  provider?: ethers.providers.BaseProvider | null
) => {
  if (provider && (await isMainnetOrTestnet(provider)))
    return await provider.getAvatar(addressOrEnsName);
  else {
    const defaultProvider = ethers.getDefaultProvider();
    return await defaultProvider.getAvatar(addressOrEnsName);
  }
};

/**
 * Check is provider connected to mainnet or not
 * @param provider
 * @returns true is provider is connected to etheruem mainnet
 */
export const isMainnet = async (provider: ethers.providers.BaseProvider) => {
  const { chainId } = await provider.getNetwork();
  return chainId === 1;
};

/**
 * Check is provider connected to ethereum's testnets or not
 * @param provider
 * @returns true if the provider is connected to one of (Ropsten, Goerli, Kovan)
 */
export const isTestnet = async (provider: ethers.providers.BaseProvider) => {
  const { chainId } = await provider.getNetwork();
  return chainId === (2 | 3 | 4);
};

/**
 * Check is provider connected to ethereum mainnet or testnet
 * @param provider
 * @returns
 */
export const isMainnetOrTestnet = async (
  provider: ethers.providers.BaseProvider
) => {
  return isMainnet(provider) || isTestnet(provider);
};

/**
 * sign message and return signature and public key
 * @param msg message to sign
 * @param provider
 * @returns [signature, public key]
 */
export const getSign = async (
  msg: string,
  provider: ethers.providers.Web3Provider
): Promise<[string, string]> => {
  const signer = provider.getSigner();
  const msgId = ethers.utils.id(msg);
  const sig = await signer.signMessage(msg);
  const pk = ethers.utils.recoverPublicKey(ethers.utils.arrayify(msgId), sig);
  return [sig, pk];
};

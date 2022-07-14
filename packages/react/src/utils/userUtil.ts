import { IUser } from '@beoble/js-sdk';

/**
 *
 * @param user user object to check online status
 * @param dappId (optional) check is user in specific dapp if provided.
 * @returns true if user is online, false if not
 */
export const getUserOnlineStatus = (user: IUser, dappId?: string) => {
  if (!user.registered_dapps) return false;
  if (dappId)
    return user.registered_dapps
      .filter((dapp) => dapp.dapp.id == dappId)
      .some((app) => app.is_online === true);
  return user.registered_dapps.some((app) => app.is_online === true);
};

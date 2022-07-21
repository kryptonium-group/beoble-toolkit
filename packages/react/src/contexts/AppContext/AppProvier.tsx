import { FC, ReactNode, useEffect, useState } from 'react';
import { Core, IUser } from '@beoble/js-sdk';
import { AppContext } from './AppContext';
import { initialUserState, IUserState } from '../../recuder/appState';
import { useAsync } from '../../hooks';

export interface IAppProvider {
  children?: ReactNode;
}

export const AppProvider: FC<IAppProvider> = ({ children }) => {
  const core = new Core({ appId: '' });
  const [state] = useAsync(() => core.user.get({}));

  return (
    <AppContext.Provider
      value={{
        userState: initialUserState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { IUser } from '@beoble/js-sdk';
import useDebounce from './useDebounce';
import { useBeoble } from './useBeoble';

export const useSearch = () => {
  //searches
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isDebouncing, debouncedSearchValue] = useDebounce(searchValue);

  const { Beoble, user } = useBeoble();

  // upadte this with useTransition or useDefferedValue in react 18
  useEffect(() => {
    searchUser(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const searchUser = async (input: string) => {
    if (Beoble) {
      setIsSearching(true);
      if (ethers.utils.isAddress(input)) {
        const user = await Beoble.user.get({
          wallet_address: input,
        });
        setIsSearching(false);
        setSearchResult(user.data);
      } else {
        const user = await Beoble.user.get({
          alias_search: input,
        });
        setIsSearching(false);
        setSearchResult(user.data);
      }
    }
  };

  const restSearchValue = () => {
    setSearchResult([]);
  };

  return {
    searchResult,
    isSearching,
    searchValue,
    isDebouncing,
    restSearchValue,
    setSearchValue,
  };
};

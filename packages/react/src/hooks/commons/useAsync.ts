import { Reducer, useEffect, useReducer } from 'react';

type ArrayWithMinimumOneElement<T> = { 0: string } & Array<T>;

type FetchTypes = 'LOADING' | 'SUCCESS' | 'ERROR';

interface FetchAction<T> {
  type: FetchTypes;
  data?: T;
  error?: any;
}

export interface APIState<T> {
  loaded: boolean;
  loading: boolean;
  data?: T | null;
  error: any | null;
}

const fetchReducer = <T>(
  state: APIState<T>,
  action: FetchAction<T>
): APIState<T> => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loaded: false,
        loading: true,
        error: null,
      };
    case 'SUCCESS':
      return { loaded: true, loading: false, data: action.data, error: null };
    case 'ERROR':
      return {
        loaded: true,
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const initialAPIState = {
  loaded: false,
  loading: false,
  data: null,
  error: null,
};

export const useAsync = <T = any>(
  restFunc: () => Promise<T>,
  deps: Array<any> = [],
  skip = false
): [APIState<T>, () => Promise<void>] => {
  const [state, dispatch] = useReducer<Reducer<APIState<T>, FetchAction<T>>>(
    fetchReducer,
    initialAPIState
  );

  useEffect(() => {
    if (skip) return;
    mutate();
  }, deps);

  const mutate = async () => {
    dispatch({
      type: 'LOADING',
    });
    try {
      const res = await restFunc();
      dispatch({ type: 'SUCCESS', data: res });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };

  return [state, mutate];
};

export const useMutation = <T = any>(
  restFunc: () => Promise<T>,
  deps: Array<any> = []
) => useAsync(restFunc, deps, true);

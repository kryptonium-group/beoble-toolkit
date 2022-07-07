import { Reducer, useEffect, useReducer } from 'react';

type ArrayWithMinimumOneElement<T> = { 0: string } & Array<T>;

type FetchTypes = 'LOADING' | 'SUCCESS' | 'ERROR';

interface FetchAction<T> {
  type: FetchTypes;
  data?: T;
  error?: any;
}

interface APIState<T> {
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

const initialState = {
  loaded: false,
  loading: false,
  data: null,
  error: null,
};

export const useRestAPI = <T = any>(
  dependecies: ArrayWithMinimumOneElement<any>,
  restFunc: () => Promise<T>
) => {
  const [state, dispatch] = useReducer<Reducer<APIState<T>, FetchAction<T>>>(
    fetchReducer,
    initialState
  );

  useEffect(() => {
    runCallback();
  }, dependecies);

  const runCallback = async () => {
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

  return state;
};

export const useRestAPIMutation = <T = any>(
  restFunc: (...args: string[]) => Promise<T>
) => {
  const [state, dispatch] = useReducer<Reducer<APIState<T>, FetchAction<T>>>(
    fetchReducer,
    initialState
  );

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

  return [mutate, state];
};

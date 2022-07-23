import { Reducer, useCallback, useEffect, useReducer } from 'react';

type FetchTypes = 'FIRED' | 'SUCCESS' | 'ERROR' | 'UPDATE';

interface FetchAction<T> {
  type: FetchTypes;
  data?: T;
  error?: any;
}

export interface APIState<T> {
  loaded: boolean;
  loading: boolean;
  updating: boolean;
  data?: T;
  error: any | null;
}

const fetchReducer = <T>(
  state: APIState<T>,
  action: FetchAction<T>
): APIState<T> => {
  switch (action.type) {
    case 'FIRED':
      if (state.data)
        return { ...state, loaded: false, updating: true, error: null };
      else
        return {
          ...state,
          loaded: false,
          loading: true,
          error: null,
        };
    case 'SUCCESS':
      return {
        loaded: true,
        loading: false,
        updating: false,
        data: action.data,
        error: null,
      };
    case 'UPDATE':
      return {
        ...state,
        data: action.data,
      };
    case 'ERROR':
      return {
        loaded: true,
        loading: false,
        updating: false,
        data: undefined,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const initialAPIState = {
  loaded: false,
  loading: false,
  updating: false,
  data: undefined,
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

  const mutate = useCallback(async () => {
    dispatch({
      type: 'FIRED',
    });
    try {
      const res = await restFunc();
      dispatch({ type: 'SUCCESS', data: res });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  }, deps);

  return [state, mutate];
};

export const useMutation = <T = any>(
  restFunc: () => Promise<T>,
  deps: Array<any> = []
) => useAsync(restFunc, deps, true);

type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

type StateFuncType<T> = (state?: T, ...args: any[]) => T | Promise<T>;
export interface QueryBuilder<dataType, queryType = string> {
  key: StringLiteral<queryType>;
  reducer: StateFuncType<dataType>;
}

/**
 *
 * @param builders
 * @returns [state, queryFn]
 */
export const useQuery = <dataType, queryType = string>(
  builders: QueryBuilder<dataType, queryType>[]
): [APIState<dataType>, (key: queryType, ...args: any[]) => void] => {
  const [state, dispatch] = useReducer<
    Reducer<APIState<dataType>, FetchAction<dataType>>
  >(fetchReducer, initialAPIState);

  const queryMap = new Map<queryType, StateFuncType<dataType>>();
  builders.forEach((builder) => {
    return queryMap.set(builder.key, builder.reducer);
  });

  const mutate = async (reducer: StateFuncType<dataType>, ...args: any[]) => {
    dispatch({
      type: 'FIRED',
    });
    try {
      const res = await reducer(state.data, ...args);
      dispatch({ type: 'SUCCESS', data: res });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };

  const query = async (key: queryType, ...args: any[]) => {
    const reducer = queryMap.get(key);
    if (!reducer) throw new Error('invalid query key');
    await mutate(reducer, ...args);
  };

  return [state, query];
};

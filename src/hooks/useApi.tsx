import { useState, useEffect } from "react";

type ApiFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

interface ApiResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

function useApi<T, Args extends any[]>(
  apiFunction: ApiFunction<T, Args>,
  ...args: Args
): ApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const isAborted = abortController.signal.aborted;

    (async () => {
      try {
        setIsLoading(true);
        const result = await apiFunction(...args);
        if (!isAborted) {
          setData(result);
        }
      } catch (err) {
        if (!isAborted) {
          setError(err as string);
        }
      } finally {
        if (!isAborted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      abortController.abort();
      setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFunction, ...args]);

  return { data, error, isLoading };
}

export default useApi;

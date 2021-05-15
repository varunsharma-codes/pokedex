import { useEffect, useState } from 'react';
import { AsyncOpState } from '../../constants/api';

/**
 *
 * @param {()=>Promise} asyncFn Generic async function which is executed
 * @param {Array} deps Dependency array
 */
const useAsyncOperation = (asyncFn, deps) => {
  const [asyncOp, setAsyncOp] = useState({
    state: AsyncOpState.NOT_STARTED,
    data: undefined,
    error: undefined
  });

  useEffect(() => {
    const callAsyncFn = async () => {
      try {
        setAsyncOp({ state: AsyncOpState.INPROGRESS });
        const data = await asyncFn();
        setAsyncOp({ state: AsyncOpState.SUCCESS, data });
      } catch (e) {
        setAsyncOp({ state: AsyncOpState.FAILED, error: e });
      }
    };
    callAsyncFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const notStarted = asyncOp.state === AsyncOpState.NOT_STARTED;
  const fetching = asyncOp.state === AsyncOpState.INPROGRESS;

  return { ...asyncOp, fetching, notStarted };
};

export default useAsyncOperation;

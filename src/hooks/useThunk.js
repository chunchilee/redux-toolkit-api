import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunk) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      // delete pass arg
      setIsLoading(true);
      // dispatch()是非同步，所以不會等待請求完成，而會跳過
      // console.log(dispatch(fetchUsers()))，return a promise
      // 但需要的status is fulfilled or rejected
      // .unwrap() ，會重新給一個全新的promise，來判斷status是fulfilled or rejected，進行.then().catch()
      // .finally() 不管status是 fulfilled or rejected，都會再最後執行
      dispatch(thunk(arg))
        .unwrap()
        // .then(()=>{
        //   setIsLoading(false)
        // })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch, thunk]
  );
  return [runThunk, isLoading, error];
};

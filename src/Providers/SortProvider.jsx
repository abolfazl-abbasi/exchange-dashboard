import _ from "lodash";
import React, { useContext, createContext, useState } from "react";
import { useCoinsProvider, useCoinsShow } from "./CoinsProvider";
import { useStartTransition } from "./Transition";

const SortContext = createContext();
const SortContextProvider = createContext();

const SortProvider = ({ children }) => {
  const [sort, setSort] = useState([]);

  return (
    <>
      <SortContext.Provider value={sort}>
        <SortContextProvider.Provider value={setSort}>
          {children}
        </SortContextProvider.Provider>
      </SortContext.Provider>
    </>
  );
};

export const useSort = () => useContext(SortContext);
export const useSortProvider = () => {
  const setSort = useContext(SortContextProvider);
  const startTransition = useStartTransition();

  const coinsShow = useCoinsShow();
  const { setCoinsShow } = useCoinsProvider();

  const handleSort = (target) => {
    setSort(target);
    startTransition(() => {
      setCoinsShow(_.orderBy(coinsShow, [target[0]], [target[1]]));
    });
  };

  return { setSort, handleSort };
};

export default SortProvider;

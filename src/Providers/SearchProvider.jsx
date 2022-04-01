import React, { useContext, createContext, useState } from "react";
import { useCoins, useCoinsProvider } from "./CoinsProvider";
import { useStartTransition } from "./Transition";

const SearchContext = createContext();
const SearchContextProvider = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState();

  return (
    <>
      <SearchContext.Provider value={search}>
        <SearchContextProvider.Provider value={setSearch}>
          {children}
        </SearchContextProvider.Provider>
      </SearchContext.Provider>
    </>
  );
};

export const useSearch = () => useContext(SearchContext);
export const useSearchProvider = () => {
  const setSearch = useContext(SearchContextProvider);

  const { setCoinsShow } = useCoinsProvider();
  const coins = useCoins();
  const startTransition = useStartTransition();
  //   const { handleSort } = useSortProvider();
  //   const sort = useSort();

  const handleSearch = (target) => {
    setSearch(target);
    startTransition(() => {
      setCoinsShow(
        coins.filter((coin) =>
          (coin.name.toLowerCase() + coin.symbol.toLowerCase()).includes(
            target.toLowerCase()
          )
        )
      );
    });
  };

  return { setSearch, handleSearch };
};

export default SearchProvider;

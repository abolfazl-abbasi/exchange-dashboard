import axios from "axios";
import React, { useContext, createContext, useState } from "react";
import { useCoinsProvider } from "./CoinsProvider";
import { useSearchProvider } from "./SearchProvider";
import { useSortProvider } from "./SortProvider";
import { useStartTransition } from "./Transition";

const UnitContext = createContext();
const UnitContextProvider = createContext();

const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState(["usd", "$"]);

  return (
    <>
      <UnitContext.Provider value={unit}>
        <UnitContextProvider.Provider value={setUnit}>
          {children}
        </UnitContextProvider.Provider>
      </UnitContext.Provider>
    </>
  );
};

export const useUnit = () => useContext(UnitContext);
export const useUnitProvider = () => {
  const setUnit = useContext(UnitContextProvider);

  const { setCoins, setCoinsShow } = useCoinsProvider();
  const { setSort } = useSortProvider();
  const { setSearch } = useSearchProvider();
  const startTransition = useStartTransition();

  const handleUnit = (target) => {
    setUnit(target);
    startTransition(() => {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${target[0]}&per_page=250&page=1`
        )
        .then((res) => {
          setCoins(res.data);
          setCoinsShow(res.data);
        })
        .catch((err) => err);
      setSort([]);
      setSearch("");
    });
  };

  return { setUnit, handleUnit };
};

export default UnitProvider;

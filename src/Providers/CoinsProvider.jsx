import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { useUnit } from "./UnitProvider";

const CoinsContext = createContext();
const CoinsContextProvider = createContext();
const CoinsShowContext = createContext();
const CoinsShowContextProvider = createContext();

const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [coinsShow, setCoinsShow] = useState([]);

  return (
    <>
      <CoinsContext.Provider value={coins}>
        <CoinsContextProvider.Provider value={setCoins}>
          <CoinsShowContext.Provider value={coinsShow}>
            <CoinsShowContextProvider.Provider value={setCoinsShow}>
              {children}
            </CoinsShowContextProvider.Provider>
          </CoinsShowContext.Provider>
        </CoinsContextProvider.Provider>
      </CoinsContext.Provider>
    </>
  );
};

export const useCoins = () => useContext(CoinsContext);
export const useCoinsShow = () => useContext(CoinsShowContext);
export const useCoinsProvider = () => {
  const setCoins = useContext(CoinsContextProvider);
  const setCoinsShow = useContext(CoinsShowContextProvider);

  const unit = useUnit();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${unit[0]}&per_page=250&page=1`
      )
      .then((res) => {
        setCoins(res.data);
        setCoinsShow(res.data);
      })
      .catch((err) => err);
  });

  return { setCoins, setCoinsShow };
};

export default CoinsProvider;

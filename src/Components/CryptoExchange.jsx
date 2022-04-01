import React, { useEffect, useRef } from "react";
import "./../App/App.css";
import { HiOutlineSearch, HiChevronDown } from "react-icons/hi";
import { addCommas } from "@persian-tools/persian-tools";
import { BsShift } from "react-icons/bs";
import { useKeyPress } from "../Hooks/useKeypress";
import { useSort, useSortProvider } from "../Providers/SortProvider";
import { useCoins, useCoinsShow } from "../Providers/CoinsProvider";
import { useSearch, useSearchProvider } from "../Providers/SearchProvider";
import { useUnit, useUnitProvider } from "../Providers/UnitProvider";
import { useIsPending } from "../Providers/Transition";

const CryptoExchange = () => {
  // const startTransition = useStartTransition();
  const isPending = useIsPending();

  const shortcut = useKeyPress("F");
  const searchInput = useRef();

  const sort = useSort();
  const coins = useCoins();
  const coinsShow = useCoinsShow();
  const search = useSearch();
  const unit = useUnit();

  const { handleSort } = useSortProvider();
  // const { setCoins, setCoinsShow } = useCoinsProvider();
  const { handleSearch } = useSearchProvider();
  const { handleUnit } = useUnitProvider();

  useEffect(() => {
    if (shortcut) {
      setTimeout(() => {
        handleSearchFocus();
      }, 1);
    }
  }, [shortcut]);

  const handleSearchFocus = () => {
    searchInput.current.focus();
  };

  return (
    <>
      <div className="container mx-auto py-2">
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col items-start">
            <div className="text-5xl text-white font-semibold">Portfolio</div>
            <div className="flex items-center text-sm mt-3">
              {coins.length ? (
                <>
                  <div
                    className={`bg-${
                      coins[0].market_cap_change_percentage_24h > 0
                        ? "green"
                        : "red"
                    }-400 p-[3px] rounded text-xs mr-2 font-bold text-zinc-900`}
                  >
                    {coins[0].market_cap_change_percentage_24h > 0
                      ? coins[0].market_cap_change_percentage_24h.toFixed(2)
                      : coins[0].market_cap_change_percentage_24h.toFixed(2) *
                        -1}
                    %
                  </div>
                  <div className="text-zinc-400">in the last 24 hours</div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleSearch(search)}
              className="bg-zinc-800 h-10 w-10 flex items-center justify-center rounded-l-md"
            >
              <HiOutlineSearch className="text-zinc-400 w-5 h-5" />
            </button>
            <input
              placeholder="Search coins . . ."
              className="!form-input h-10 w-64 p-1 !border-0 !outline-none focus:outline-none focus:bottom-0 !bg-zinc-800 !text-white"
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              ref={searchInput}
            />
            <button
              onClick={handleSearchFocus}
              className="bg-zinc-800 h-10 w-16 flex items-center justify-evenly pr-2 !rounded-r-md text-zinc-400 "
            >
              <BsShift className="w-5 h-5" /> + <span>F</span>
            </button>
          </div>
          <div>
            <div className="flex items-center">
              <select
                className="form-select bg-zinc-800 h-10 text-white w-24 px-2 rounded"
                onChange={(e) => handleUnit(e.target.value.split(","))}
              >
                <option value={["usd", "$"]} key="usd">
                  $ USD
                </option>
                <option value={["eur", "€"]} key="eur">
                  € EUR
                </option>
                <option value={["krw", "₩"]} key="krw">
                  ₩ KRW
                </option>
                <option value={["aud", "$"]} key="aud">
                  $ AUD
                </option>
                <option value={["inr", "₹"]} key="int">
                  ₹ INR
                </option>
              </select>
            </div>
          </div>
        </div>
        <table className="w-full table-auto border-0 my-10 rounded-xl overflow-hidden">
          <thead className="bg-zinc-800">
            <tr className="text-left h-10 border-0">
              <th className="py-4 text-zinc-50 text-center">
                <span>#</span>
              </th>
              <th
                onClick={() =>
                  handleSort(["symbol", sort[1] === "asc" ? "desc" : "asc"])
                }
                className="py-4 text-zinc-50 w-72"
              >
                <span>
                  Token{" "}
                  <HiChevronDown
                    className={`inline transition-all ${
                      sort[0] === "name" && sort[1] === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </span>
              </th>
              <th
                onClick={() =>
                  handleSort([
                    "current_price",
                    sort[1] === "asc" ? "desc" : "asc",
                  ])
                }
                className="py-4 text-zinc-50"
              >
                <span>
                  Price{" "}
                  <HiChevronDown
                    className={`inline transition-all ${
                      sort[0] === "current_price" && sort[1] === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </span>
              </th>
              <th
                onClick={() =>
                  handleSort([
                    "price_change_percentage_24h",
                    sort[1] === "asc" ? "desc" : "asc",
                  ])
                }
                className="py-4 text-zinc-50"
              >
                <span>
                  Changes_24h{" "}
                  <HiChevronDown
                    className={`inline transition-all ${
                      sort[0] === "price_change_percentage_24h" &&
                      sort[1] === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </span>
              </th>
              <th
                onClick={() =>
                  handleSort(["market_cap", sort[1] === "asc" ? "desc" : "asc"])
                }
                className="py-4 text-zinc-50"
              >
                <span>
                  Market Cap{" "}
                  <HiChevronDown
                    className={`inline transition-all ${
                      sort[0] === "market_cap" && sort[1] === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </span>
              </th>
              <th
                onClick={() =>
                  handleSort([
                    "total_volume",
                    sort[1] === "asc" ? "desc" : "asc",
                  ])
                }
                className="py-4 text-zinc-50"
              >
                <span>
                  Total Volume{" "}
                  <HiChevronDown
                    className={`inline transition-all ${
                      sort[0] === "total_volume" && sort[1] === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </span>
              </th>
            </tr>
          </thead>
          {coins.length ? (
            <tbody className={`bg-white ${isPending ? "opacity-30" : ""}`}>
              {coinsShow.map((coin) => (
                <tr
                  className="whitespace-nowrap bg-zinc-800 border-0 odd:bg-zinc-700"
                  key={coin.id}
                >
                  <td className="w-16 text-sm text-zinc-50 text-center">
                    {coin.market_cap_rank}
                  </td>
                  <td className="text-sm text-zinc-50 flex items-center mt-[10px] gap-x-4 w-48">
                    <img src={coin.image} alt="" className="w-8 h-8" />
                    <div>
                      <div>{coin.name}</div>
                      <div className="text-sm text-zinc-400">{coin.symbol}</div>
                    </div>
                  </td>
                  <td className="">
                    <div className="text-sm text-zinc-50">
                      {addCommas(coin.current_price)} {unit[1]}
                    </div>
                  </td>
                  <td
                    className={`text-sm text-zinc-50 ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h > 0
                      ? coin.price_change_percentage_24h.toFixed(2)
                      : coin.price_change_percentage_24h.toFixed(2) * -1}
                    %
                  </td>
                  <td className=" text-sm text-zinc-50">
                    {addCommas(coin.market_cap)} {unit[1]}
                  </td>
                  <td className=" text-sm text-zinc-50">
                    {addCommas(coin.total_volume)} {unit[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            ""
          )}
        </table>
      </div>
    </>
  );
};

export default CryptoExchange;

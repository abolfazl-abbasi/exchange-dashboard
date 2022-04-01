import React from "react";
import CoinsProvider from "./CoinsProvider";
import SearchProvider from "./SearchProvider";
import SortProvider from "./SortProvider";
import Transition from "./Transition";
import UnitProvider from "./UnitProvider";

const MainProvider = ({ children }) => {
  return (
    <>
      <Transition>
        <CoinsProvider>
          <UnitProvider>
            <SortProvider>
              <SearchProvider>{children}</SearchProvider>
            </SortProvider>
          </UnitProvider>
        </CoinsProvider>
      </Transition>
    </>
  );
};

export default MainProvider;

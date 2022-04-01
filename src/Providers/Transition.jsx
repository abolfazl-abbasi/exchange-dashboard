import React, { useContext, createContext, useTransition } from "react";

const IsPending = createContext();
const StartTransition = createContext();

const Transition = ({ children }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <IsPending.Provider value={isPending}>
        <StartTransition.Provider value={startTransition}>
          {children}
        </StartTransition.Provider>
      </IsPending.Provider>
    </>
  );
};

export const useIsPending = () => useContext(IsPending);
export const useStartTransition = () => useContext(StartTransition);

export default Transition;

import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const SrcollUpDownContext = createContext(null);

export const ScrollUpDownContextProvider = ({ children }) => {
  const [isScrollingDown, setScrollingDown] = useState(null);

  return (
    <SrcollUpDownContext.Provider value={{ isScrollingDown, setScrollingDown }}>
      {children}
    </SrcollUpDownContext.Provider>
  );
};

export const useScrollUpAndDownContext = () => {
  return useContext(SrcollUpDownContext);
};

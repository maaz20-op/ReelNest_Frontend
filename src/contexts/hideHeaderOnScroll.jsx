import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";

const SrcollUpDownContext = createContext(null);

export const ScrollUpDownContextProvider = ({ children }) => {
  const [isScrollingDown, setScrollingDown] = useState(false);

  // ✅ FIX 1: Context value ko memoize karo taaki extra re-renders rukein
  const value = useMemo(
    () => ({ isScrollingDown, setScrollingDown }),
    [isScrollingDown],
  );

  return (
    <SrcollUpDownContext.Provider value={value}>
      {children}
    </SrcollUpDownContext.Provider>
  );
};

export const useScrollUpAndDownContext = () => {
  return useContext(SrcollUpDownContext);
};

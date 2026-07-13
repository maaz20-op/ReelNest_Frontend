import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBtnClick, setSearchBtnClicked] = useState(false);

  const value = {
    searchQuery,
    setSearchQuery,
    setSearchBtnClicked,
    isSearchBtnClick,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const searchData = useContext(SearchContext);
  console.log(searchData);
  return {
    searchQuery: searchData?.searchQuery,
    setSearchQuery: searchData?.setSearchQuery,
    isSearchBtnClick: searchData?.isSearchBtnClick,
    setSearchBtnClicked: searchData?.setSearchBtnClicked,
  };
};

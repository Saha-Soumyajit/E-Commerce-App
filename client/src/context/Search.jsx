import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom Hook
export const useSearch = () => useContext(SearchContext);

export default SearchProvider;

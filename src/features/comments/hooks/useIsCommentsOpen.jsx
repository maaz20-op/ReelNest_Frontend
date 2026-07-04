import { createContext, useState, useContext } from "react";

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  return (
    <CommentsContext.Provider value={{ isCommentsOpen, setIsCommentsOpen }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => useContext(CommentsContext);

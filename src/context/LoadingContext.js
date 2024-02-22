import { createContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, user, setUser }}>
      {children}
    </LoadingContext.Provider>
  );
};

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type GlobalContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  isCongratulation: boolean;
  userType: 'student' | 'instructor' | undefined;
  setIsLoggedIn: (value: boolean) => void;
  setCongratulation: (value: boolean) => void;
  setUserType: (value: 'student' | 'instructor') => void;
};

export const globalContext = createContext<GlobalContextProps>({
  isLoggedIn: false,
  isCongratulation: false,
  isLoading: true,
  userType: 'student',
  setIsLoggedIn: (value: boolean) => {},
  setCongratulation: (value: boolean) => {},
  setUserType: (value: 'student' | 'instructor') => {},
});

export const useGlobalContext = () => useContext(globalContext);

const GlobalContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCongratulation, setCongratulation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<'student' | 'instructor'>('student');

  useEffect(() => {
    const fUserType = localStorage.getItem('userType');

    setUserType(fUserType as 'student' | 'instructor');

    const getCurrentUser = async () => {
      const user = await getCurrentUserFromLocalStorage();
      setIsLoading(false);
    };
    getCurrentUser();
  }, []);

  return (
    <globalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        userType,
        setUserType,
        isCongratulation,
        setCongratulation,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;

function getCurrentUserFromLocalStorage() {
  return new Promise((resolve) => setTimeout(resolve, 5000));
}

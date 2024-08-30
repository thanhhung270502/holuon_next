'use client';

import { Session, User } from '@/types';
import { Token } from '@/utils/localStorage';
import { createContext, useEffect, useState } from 'react';

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

function AppProvider({ children }: { children: React.ReactNode }) {
  const token = new Token();
  const [user, setUser] = useState<User | null>(() => {
    const session: Session = token.getSession();
    if (session) return session.user;
    else return null;
  });
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const session: Session = token.getSession();
    if (!session) return;
    const _user = session.user;
    setUser(_user);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };

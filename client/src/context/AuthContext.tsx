import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  balance: number;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean; // <-- НОВОЕ СВОЙСТВО
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // <-- НОВОЕ СОСТОЯНИЕ

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
    } finally {
      // В любом случае (нашли пользователя или нет), загрузка завершена
      setIsLoading(false); // <-- УСТАНАВЛИВАЕМ В FALSE
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

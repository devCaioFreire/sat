'use client'
import { AxiosNode } from '@/services/axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserData {
  id: number;
  name: string;
  lastName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('O provedor não foi autenticado');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  function parseJwt(token: string | null) {
    if (!token) {
      return {};
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  useEffect(() => {
    const jwt = sessionStorage.getItem('token');
    const jwtData = parseJwt(jwt);

    const userId = jwtData.id;
    const userName = jwtData.name;
    const lastName = jwtData.lastName;

    setUser({
      id: userId,
      name: userName,
      lastName: lastName,
    });
  }, []);

  let jwtToken: any;
  if (typeof window !== 'undefined') {
    jwtToken = sessionStorage.getItem('token');
  }

  useEffect(() => {
    if (!jwtToken) {
      router.push('/');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [jwtToken, router]);


  const login = async (email: string, password: string) => {
    try {
      const response = await AxiosNode.post('/login', {
        email,
        senha: password
      })

      if (response.status === 200) {
        const { token } = response.data;

        sessionStorage.setItem('token', token);
        setIsAuthenticated(true);
        router.push('/dashboard/home');

      } else {
        console.log('Error: ' + response.status + 'Não foi permitido acessar')
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log('Error: Não foi permitido acessar')
      setIsAuthenticated(false);
      setError(true);
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('token');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};


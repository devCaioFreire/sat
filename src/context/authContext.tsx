'use client'
import { AxiosNode } from '@/services/axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
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
  const [error, setError] = useState(false);
  const router = useRouter();

  const jwtToken = sessionStorage.getItem('token');

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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};


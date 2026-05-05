import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializamos el estado de la sesión, idealmente leyendo de localStorage después.
  // Por defecto empezamos deslogueados.
  const [user, setUser] = useState(null);
  
  // user object shape: { id: 1, name: 'John', role: 'CLIENT' | 'MECHANIC' | 'ADMIN' }
  const isLoggedIn = !!user;
  const role = user?.role || null;

  // Funciones de simulación de Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Al cargar la app, intentamos recuperar la sesión del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

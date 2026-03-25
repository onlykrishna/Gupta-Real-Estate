import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  setAuth: (admin: Admin) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      admin: null,
      setAuth: (admin) => set({ isAuthenticated: true, admin }),
      logout: () => {
         set({ isAuthenticated: false, admin: null });
         localStorage.removeItem('gupta-auth');
      },
    }),
    {
      name: 'gupta-auth',
    }
  )
);

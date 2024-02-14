import { createContext, useContext, useState } from "react";

const useUserState = () => useState<string | null>(null);

const AuthContext = createContext<{
  user: ReturnType<typeof useUserState>["0"];
  setUser: ReturnType<typeof useUserState>["1"];
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useUserState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // NOTE: この関数はAuthProviderの子コンポーネント内で呼び出されることを前提としている
  return useContext(AuthContext)!;
}

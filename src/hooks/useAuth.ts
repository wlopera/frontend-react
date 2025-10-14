import { useState } from "react";

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const saveToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setTokenState(null);
  };

  return { token, saveToken, clearToken };
}

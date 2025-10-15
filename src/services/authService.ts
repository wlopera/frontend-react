// src/services/authService.ts
import { apiFetch } from "./api";

interface LoginResponse {
  token: string;
  user?: {
    id: number;
    username: string;
    email?: string;
  };
}

/**
 * Inicia sesión con usuario y contraseña
 */
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  return apiFetch("auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

/**
 * Verifica el token actual (opcional, si tu backend lo soporta)
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await apiFetch("auth/verify", { method: "GET" }, token);
    return true;
  } catch {
    return false;
  }
};

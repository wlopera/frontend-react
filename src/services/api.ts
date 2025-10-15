const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {},
  token?: string
) => {
  const headers: HeadersInit = {
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error en la petición al servidor");
  }

  return res.json();
};

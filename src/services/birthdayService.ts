import { apiFetch } from "./api";

// 🔹 Obtener todos los cumpleaños
export const getBirthdays = async (token: string) => {
  return apiFetch("api/birthday", { method: "GET" }, token);
};

// 🔹 Obtener cumpleaño por ID
export const getBirthdayyId = async (id: number, token: string) => {
  return apiFetch(`api/birthday/${id}`, { method: "GET" }, token);
};

// 🔹 Crear cumpleaño con foto (FormData)
export const createBirthday = async (data: FormData, token: string) => {
  return apiFetch("api/birthday", { method: "POST", body: data }, token);
};

// 🔹 Actualizar cumpleaño
export const updateBirthday = async (id: number, body: any, token: string) => {
  return apiFetch(
    `api/birthday/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    token
  );
};

// 🔹 Eliminar cumpleaño
export const deleteBirthday = async (id: number, token: string) => {
  return apiFetch(`api/birthday/${id}`, { method: "DELETE" }, token);
};

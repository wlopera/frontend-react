import { apiFetch } from "./api";

// 🔹 Obtener todas las personas
export const getPersons = async (token: string) => {
  return apiFetch("api/person", { method: "GET" }, token);
};

// 🔹 Obtener persona por ID
export const getPersonById = async (id: number, token: string) => {
  return apiFetch(`api/person/${id}`, { method: "GET" }, token);
};

// 🔹 Crear persona con foto (FormData)
export const createPerson = async (data: FormData, token: string) => {
  return apiFetch("api/person", { method: "POST", body: data }, token);
};

// 🔹 Actualizar persona
export const updatePerson = async (id: number, body: any, token: string) => {
  return apiFetch(
    `api/person/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    token
  );
};

// 🔹 Eliminar persona
export const deletePerson = async (id: number, token: string) => {
  return apiFetch(`api/person/${id}`, { method: "DELETE" }, token);
};

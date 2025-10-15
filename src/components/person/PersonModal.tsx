// src/components/person/PersonModal.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Person } from "../../types/Person";
import { createPerson } from "../../services/personService";

interface Props {
  onClose: () => void;
  refresh: () => void;
}

export default function PersonModal({ onClose, refresh }: Props) {
  const { token } = useAuth();
  const [form, setForm] = useState<Partial<Person>>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null); // Archivo real
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoFile(file); // Guardamos el File para enviar al backend
    }
  };

  const handleSubmit = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v) formData.append(k, v.toString());
      });
      if (photoFile) formData.append("photo", photoFile);

      await createPerson(formData, token);
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al guardar persona");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Agregar Persona</h2>

        <div className="flex flex-col gap-2">
          <input
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Teléfono"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="birth_date"
            type="date"
            placeholder="Fecha de Nacimiento"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="identity_number"
            placeholder="Número de Identidad"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="address"
            placeholder="Dirección"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
          {photoFile && (
            <img
              src={URL.createObjectURL(photoFile)}
              alt="preview"
              className="w-24 h-24 object-cover rounded-full mt-2 mx-auto shadow-md"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancelar
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-blue-300"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

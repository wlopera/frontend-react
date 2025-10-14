// src/components/person/PersonTable.tsx
import { useState, useEffect } from "react";
import PersonModal from "./PersonModal";
import PersonDetailModal from "./PersonDetailModal";
import { useAuth } from "../../hooks/useAuth";
import type { Person } from "../../types/Person";

export default function PersonTable() {
  const { token } = useAuth();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const fetchPersons = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/person", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener personas");
      const data = await res.json();
      setPersons(data);
    } catch (err) {
      setError("No se pudieron cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [token]);

  const handleDelete = async (identity_number: string) => {
    console.log("Persona a borrra: ", identity_number);
    if (!token) return;
    try {
      await fetch(`http://localhost:3000/api/person/${identity_number}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPersons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Personas</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Agregar
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-200">Identidad</th>
              <th className="border px-2 py-1 bg-gray-200">Nombre</th>
              <th className="border px-2 py-1 bg-gray-200">Teléfono</th>
              <th className="border px-2 py-1 bg-gray-200">Email</th>
              <th className="border px-2 py-1 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((p) => (
              <tr key={p.identity_number}>
                <td
                  className="border px-2 py-1 cursor-pointer text-blue-600 underline"
                  onClick={() => setSelectedPerson(p)}
                >
                  {p.identity_number}
                </td>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.phone}</td>
                <td className="border px-2 py-1">{p.email}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <PersonModal
          onClose={() => setModalOpen(false)}
          refresh={fetchPersons}
        />
      )}

      {selectedPerson && (
        <PersonDetailModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
}

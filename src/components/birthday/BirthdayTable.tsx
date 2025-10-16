import { useState, useEffect } from "react";
import BirthdayModal from "./BirthdayModal";
import BirthdayDetailModal from "./BirthdayDetailModal";
import { useAuth } from "../../hooks/useAuth";
import type { Birthday } from "../../types/Birthday";
import { deleteBirthday, getBirthdays } from "../../services/birthdayService";

export default function BirthdayTable() {
  const { token } = useAuth();
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(
    null
  );

  const fetchBirthdays = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getBirthdays(token);
      setBirthdays(data);
    } catch (err) {
      console.error("❌ Error al obtener cumpleaños:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("¿Seguro que deseas eliminar este cumpleaño?")) return;

    try {
      await deleteBirthday(id, token);
      fetchBirthdays();
    } catch (err) {
      console.error("❌ Error al eliminar cumpleaño:", err);
      alert("Error al eliminar cumpleaño");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Cumpleaños</h2>
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
              <th className="border px-2 py-1 bg-gray-200">Nombre</th>
              <th className="border px-2 py-1 bg-gray-200">
                Fecha de Nacimiento
              </th>
              <th className="border px-2 py-1 bg-gray-200">Email</th>
              <th className="border px-2 py-1 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {birthdays.map((p) => (
              <tr key={p.id}>
                <td
                  className="border px-2 py-1 cursor-pointer text-blue-600 underline"
                  onClick={() => setSelectedBirthday(p)}
                >
                  {p.name}
                </td>

                <td className="border px-2 py-1">
                  {new Date(p.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
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
        <BirthdayModal
          onClose={() => setModalOpen(false)}
          refresh={fetchBirthdays}
        />
      )}

      {selectedBirthday && (
        <BirthdayDetailModal
          birthday={selectedBirthday}
          onClose={() => setSelectedBirthday(null)}
        />
      )}
    </div>
  );
}

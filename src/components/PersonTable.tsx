// src/pages/PersonTable.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface Person {
  id: string;
  name: string;
  phone: string;
  email: string;
  birth_date: string;
  identity_number: string;
  address: string;
  photo?: string;
}

export default function PersonTable() {
  const { token } = useAuth();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const fetchPersons = async () => {
    if (!token) return;
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

  const handleAdd = async () => {
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("birth_date", birthDate);
    formData.append("identity_number", identityNumber);
    formData.append("address", address);
    if (photo) formData.append("photo", photo);

    try {
      await fetch("http://localhost:3000/api/person", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      fetchPersons();
      // Limpiar inputs
      setName("");
      setPhone("");
      setEmail("");
      setBirthDate("");
      setIdentityNumber("");
      setAddress("");
      setPhoto(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`http://localhost:3000/api/person/${id}`, {
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
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Cédula"
          value={identityNumber}
          onChange={(e) => setIdentityNumber(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setPhoto(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Nacimiento</th>
              <th className="border p-2">Cédula</th>
              <th className="border p-2">Dirección</th>
              <th className="border p-2">Foto</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.phone}</td>
                <td className="border p-2">{p.email}</td>
                <td className="border p-2">{p.birth_date}</td>
                <td className="border p-2">{p.identity_number}</td>
                <td className="border p-2">{p.address}</td>
                <td className="border p-2">
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "Sin foto"
                  )}
                </td>
                <td className="border p-2">
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
    </div>
  );
}

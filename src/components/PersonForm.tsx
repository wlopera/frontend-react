import React, { useState } from "react";

interface PersonFormProps {
  apiUrl: string;
  token: string;
  onSuccess: () => void;
}

const PersonForm: React.FC<PersonFormProps> = ({
  apiUrl,
  token,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/person`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        onSuccess();
      } else {
        console.error("Error creando persona");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mb-6"
    >
      <h3 className="text-xl font-bold mb-4">Agregar Persona</h3>
      <input
        className="border p-2 mb-3 w-full rounded"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mb-3 w-full rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
      >
        Crear
      </button>
    </form>
  );
};

export default PersonForm;

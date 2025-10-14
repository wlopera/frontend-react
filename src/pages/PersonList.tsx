import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface Person {
  id: number;
  name: string;
  email: string;
}

export default function PersonList() {
  const { token } = useAuth();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://tu-backend-render.com/api/person", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch(console.error);
  }, [token]);

  if (!token) return <div className="p-4">Debes iniciar sesión primero.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Personas</h2>
      <ul>
        {people.map((p) => (
          <li key={p.id} className="border p-2 mb-2 rounded">
            {p.name} - {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// src/pages/Login.tsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { saveToken } = useAuth(); // ✅ Hook se llama en el nivel superior
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error en login");
        return;
      }

      const data = await res.json();
      setToken(data.token); // Guardamos token en estado
      saveToken(data.token); // Guardamos token en localStorage
      navigate("/dashboard"); // 🔹 Redirige al dashboard
    } catch (err) {
      setError("Error de conexión al servidor");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-20 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Ingresar
        </button>
      </form>

      {token && <p className="mt-4 text-green-600 break-all">Token: {token}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import PersonTable from "../components/person/PersonTable";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { token, clearToken } = useAuth();
  const [view, setView] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!token) return <Login />;

  const handlerLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <nav className="w-48 bg-gray-800 text-white p-4 flex flex-col gap-2">
        <button
          onClick={() => setView("users")}
          className="p-2 hover:bg-gray-700 rounded"
        >
          Usuarios
        </button>
        <button
          onClick={() => setView("persons")}
          className="p-2 hover:bg-gray-700 rounded"
        >
          Personas
        </button>
        <button
          onClick={handlerLogout}
          className="p-2 mt-auto bg-red-500 hover:bg-red-600 rounded"
        >
          Cerrar sesión
        </button>
      </nav>

      <main className="flex-1 p-4 overflow-auto">
        {!view && (
          <p className="text-gray-500">Selecciona una opción del menú</p>
        )}

        {view === "users" && <UserTable />}
        {view === "persons" && <PersonTable />}
      </main>
    </div>
  );
}

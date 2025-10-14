// src/components/person/PersonDetailModal.tsx
import React from "react";
import type { Person } from "../../types/Person";

interface Props {
  person: Person;
  onClose: () => void;
}

export default function PersonDetailModal({ person, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">{person.name}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center mb-4">
            <img
              src={person.photo}
              alt={person.name}
              style={{ width: "120px", height: "120px" }}
              className="object-cover rounded-full shadow-md ring-4 ring-white"
            />
          </div>

          {/* Identificacion izquierda / fecha de nacimiento */}
          <div className="flex justify-between text-sm text-gray-700">
            <span>
              <strong>{person.identity_number}</strong>
            </span>
            <span>
              {new Date(person.birth_date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Teléfono izquierda / Email derecha */}
          <div className="flex justify-between text-sm text-gray-700">
            <span>
              <strong>📞</strong> {person.phone}
            </span>
            <span>
              <strong>✉️</strong> {person.email}
            </span>
          </div>

          <p>{person.address}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

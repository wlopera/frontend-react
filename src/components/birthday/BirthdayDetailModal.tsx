import type { Birthday } from "../../types/Birthday";

interface Props {
  birthday: Birthday;
  onClose: () => void;
}

export default function BirthdayDetailModal({ birthday, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">{birthday.name}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center mb-4">
            <img
              src={birthday.image}
              alt={birthday.name}
              style={{ width: "120px", height: "120px" }}
              className="object-cover rounded-full shadow-md ring-4 ring-white"
            />
          </div>

          {/* Identificacion izquierda / fecha de nacimiento */}
          <div className="flex justify-end text-sm text-gray-700">
            <span>
              {new Date(birthday.date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Teléfono izquierda / Email derecha */}
          <span>
            <strong>📞</strong> {birthday.phone}
          </span>
          <span>
            <strong>✉️</strong> {birthday.email}
          </span>
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

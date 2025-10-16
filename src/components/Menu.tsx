import React from "react";

export default function Menu({ active, onSelect }) {
  const items = ["Cumpleaños", "Personas"];

  return (
    <div className="w-48 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Mi Dashboard</h1>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`p-2 rounded cursor-pointer ${
              active === item ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

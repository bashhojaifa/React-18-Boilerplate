import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export default function Dropdown({ actions }) {
  const [isOpen, setIsOpen] = useState(false); // Track menu state

  // Toggle menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      {/* Icon Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <FiMoreHorizontal size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1">
            {actions.map((action, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {action.icon}
                  <span>{action.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

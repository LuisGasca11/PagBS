import { useEffect } from "react";
import UsersPanel from "./UsersPanel";
import { X } from "lucide-react";

export default function AdminUsersPanel({ onClose }) {

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original || "unset";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-blur/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}             
    >
      <div
        className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-red-500"
          aria-label="Cerrar"
        >
          <X />
        </button>
        {/* Contenido */}
        <UsersPanel />
      </div>
    </div>
  );
}

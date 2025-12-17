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
      className="fixed inset-0 bg-[#1A1F26]/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}             
    >
      <div
        className="bg-white rounded-[2rem] shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden relative border border-gray-100 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-end justify-end px-8 py-2 border-b border-gray-50">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-300 text-black hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="p-2 sm:p-8 overflow-y-auto max-h-[calc(85vh-100px)] custom-scrollbar">
          <UsersPanel />
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
import { X } from "lucide-react";

export default function SessionWarning({ onContinue, onLogout }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-fadeInUp relative">

        <button
          onClick={onLogout}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Tu sesión está por expirar
        </h2>

        <p className="text-gray-700 text-center mb-6">
          No detectamos actividad reciente.  
          ¿Deseas continuar con tu sesión?
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cerrar sesión
          </button>

          <button
            onClick={onContinue}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
          >
            Continuar
          </button>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp .25s ease-out; }
        `}</style>
      </div>
    </div>
  );
}

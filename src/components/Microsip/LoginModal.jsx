import React, { useState, useRef, useEffect } from "react";
import { X, Eye, EyeOff, Check } from "lucide-react";
import { loginUser, saveSession } from "./utils/auth";

export default function LoginModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      const enter = e.key === "Enter";
      const ctrl = e.ctrlKey && e.key === "Enter";
      const meta = e.metaKey && e.key === "Enter";

      if (enter || ctrl || meta) {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [form]);

  const handleClose = () => {
    if (loading) return;
    setClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handleSubmit = async () => {
    if (loading) return;

    setError("");
    setShake(false);
    setLoading(true);

    const result = await loginUser(form.username, form.password);

    if (!result.ok) {
      setLoading(false);
      setShake(true);
      setError(result.message);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      saveSession(result.user, result.token);  
      onSuccess(result.user);
      handleClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">

      <div
        className={`
          relative bg-white/80 backdrop-blur-xl border border-white/30 
          shadow-2xl p-8 rounded-2xl max-w-md w-full
          ${closing ? "animate-fadeOutDown" : "animate-fadeInUp"} 
          ${shake ? "animate-shake" : ""}
        `}
      >

        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Iniciar Sesión
        </h2>

        {/* Formulario */}
        <div className="space-y-6">

          {/* Campo Usuario */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              className="
                w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 
                peer text-gray-900 focus:ring-2 focus:ring-orange-400 outline-none
              "
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <label
              className="
                absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none 
                transition-all duration-200
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-600
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-orange-600
              "
            >
              Usuario
            </label>
          </div>

          {/* Campo Contraseña */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="
                w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 
                peer text-gray-900 focus:ring-2 focus:ring-orange-400 outline-none
              "
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label
              className="
                absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none 
                transition-all duration-200
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-600
                peer-valid:-top-2 peer-valid:text-xs peer-valid:text-orange-600
              "
            >
              Contraseña
            </label>

            {/* Toggle de contraseña */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Botón ingresar */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full py-3 rounded-xl bg-orange-500 
              text-white font-semibold text-lg
              hover:bg-orange-600 transition 
              disabled:opacity-50
            "
          >
            {loading ? "Iniciando..." : "Ingresar"}
          </button>
        </div>

        {/* ÉXITO — animación iOS */}
        {success && (
          <div className="absolute inset-0 flex justify-center items-center animate-pop">
            <div className="w-24 h-24 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl">
              <Check className="w-12 h-12 text-green-600" />
            </div>
          </div>
        )}

        {/* Spinner Apple */}
        {loading && !success && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="loaderApple"></div>
          </div>
        )}

        {/* Animaciones */}
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeOutDown {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
          }
          .animate-fadeInUp { animation: fadeInUp .3s ease-out; }
          .animate-fadeOutDown { animation: fadeOutDown .25s ease-in; }

          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            50% { transform: translateX(6px); }
            75% { transform: translateX(-4px); }
            100% { transform: translateX(0); }
          }
          .animate-shake {
            animation: shake 0.35s ease-in-out;
          }

          @keyframes pop {
            0% { transform: scale(.5); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop {
            animation: pop .4s ease-out;
          }

          /* Spinner Apple */
          .loaderApple {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin .8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>

      </div>
    </div>
  );
}

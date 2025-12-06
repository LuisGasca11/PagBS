import React, { useState, useEffect, useRef } from "react";
import { X, Save, AlertTriangle, Check } from "lucide-react";
import Portal from "./Portal";
import SuccessToast from "./SuccessToast";

export default function AdminHourlyPanel({ onClose, hourlyPricesDB }) {
  const [prices, setPrices] = useState({});
  const [changes, setChanges] = useState({});
  const [confirmData, setConfirmData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    setPrices(hourlyPricesDB);

    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [hourlyPricesDB]);

  const handleOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  };

  const handleChange = (modulo, value) => {
    const num = value === "" ? null : Number(value);

    setChanges((prev) => ({
      ...prev,
      [modulo]: num,
    }));

    setPrices((prev) => ({
      ...prev,
      [modulo]: num,
    }));
  };

  const requestSave = (modulo) => {
    setConfirmData({
      type: "single",
      modulo,
      value: prices[modulo],
    });
  };

  const requestMassSave = () => {
    if (Object.keys(changes).length === 0) {
      alert("No hay cambios por guardar.");
      return;
    }
    setConfirmData({ type: "multi" });
  };

  const executeSave = async () => {
    if (!confirmData) return;

    const items =
      confirmData.type === "multi"
        ? Object.entries(changes)
        : [[confirmData.modulo, confirmData.value]];

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
    setSaving(true);

    try {
      for (const [modulo, value] of items) {
        await fetch(`/api/precios_hora/${modulo}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ costo_hora: value }),
        });
      }

      setChanges({});
      setConfirmData(null);

      setTimeout(() => setSaving(false), 500);
    } catch (err) {
      alert("Error guardando cambios");
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-[9999] animate-fadeIn"
        onMouseDown={handleOutside}
      >
        <div
          ref={modalRef}
          className="bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl w-full max-w-3xl max-h-[90vh] p-6 overflow-hidden animate-slideUp text-black"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-300">
            <h2 className="text-3xl font-bold text-gray-900">
              Administrar Precios por Hora
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* LISTA DE PRECIOS */}
          <div className="overflow-y-auto max-h-[65vh] mt-4 pr-1 space-y-4">
            {Object.keys(prices).map((modulo) => {
              const changed = changes.hasOwnProperty(modulo);

              return (
                <div
                  key={modulo}
                  className={`p-4 border rounded-xl shadow-sm transition ${
                    changed ? "bg-yellow-50" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <h3 className="font-semibold text-lg text-gray-900">{modulo}</h3>

                  <div className="mt-3 flex gap-4 items-center">
                    <input
                      type="number"
                      className="px-3 py-2 rounded-lg border border-gray-300 text-black bg-white w-32 focus:ring-2 focus:ring-blue-400 transition"
                      value={prices[modulo] || ""}
                      onChange={(e) => handleChange(modulo, e.target.value)}
                    />

                    <button
                      disabled={!changed}
                      onClick={() => requestSave(modulo)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white transition transform ${
                        changed
                          ? "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Save className="w-4 h-4" />
                      Guardar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="pt-4 border-t border-gray-300 flex justify-end bg-white">
            <button
              onClick={requestMassSave}
              className="px-5 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transform hover:scale-105 transition relative"
            >
              Guardar todos
              {saving && (
                <Check className="w-5 h-5 absolute -right-8 top-1/2 -translate-y-1/2 text-green-600 animate-ping" />
              )}
            </button>
          </div>

          {showToast && <SuccessToast text="Cambios guardados" />}

          {/* CONFIRMACIÓN */}
          {confirmData && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center animate-fadeIn z-50">
              <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md animate-slideUp">
                <div className="flex flex-col items-center text-center">
                  <AlertTriangle className="w-12 h-12 text-orange-500 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Confirmar cambios
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {confirmData.type === "multi"
                      ? "¿Guardar todos los cambios realizados?"
                      : `¿Guardar precio para ${confirmData.modulo}?`}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setConfirmData(null)}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={executeSave}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <style>{`
            .animate-fadeIn { animation: fadeIn .2s ease-out; }
            .animate-slideUp { animation: slideUp .25s ease-out; }

            @keyframes fadeIn {
              from { opacity: 0 }
              to   { opacity: 1 }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0 }
              to   { transform: translateY(0); opacity: 1 }
            }
          `}</style>
        </div>
      </div>
    </Portal>
  );
}
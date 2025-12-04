import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { X, Save, AlertTriangle, Check } from "lucide-react";
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
  }, []);

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
    if (Object.keys(changes).length === 0) return;
    setConfirmData({ type: "multi" });
  };

  const executeSave = async () => {
    if (!confirmData) return;

    const items =
      confirmData.type === "multi"
        ? Object.entries(changes)
        : [[confirmData.modulo, confirmData.value]];

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

      setShowToast(true);
      setTimeout(() => setShowToast(false), 1200);

      setSaving(false);
    } catch (err) {
      alert("Error guardando cambios");
      setSaving(false);
    }
  };

  const modal = (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-[9999] animate-fadeIn"
      onMouseDown={handleOutside}
    >
      <div
        ref={modalRef}
        className="bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl w-full max-w-3xl max-h-[85vh] p-6 overflow-hidden animate-slideUp text-black"
      >
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

        <div className="overflow-y-auto max-h-[60vh] mt-5 pr-2 space-y-4">
          {Object.keys(prices).map((modulo) => {
            const changed = changes.hasOwnProperty(modulo);

            return (
              <div
                key={modulo}
                className={`p-4 border rounded-xl shadow-sm bg-white ${
                  changed ? "bg-yellow-50" : ""
                }`}
              >
                <h3 className="font-semibold text-lg">{modulo}</h3>

                <div className="mt-3 flex gap-4 items-center">
                  <input
                    type="number"
                    className="px-3 py-2 rounded-lg border border-gray-300 text-black bg-white w-32"
                    value={prices[modulo]}
                    onChange={(e) =>
                      handleChange(modulo, e.target.value)
                    }
                  />

                  <button
                    disabled={!changed}
                    onClick={() => requestSave(modulo)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white ${
                      changed
                        ? "bg-blue-600 hover:bg-blue-700"
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

        <div className="pt-4 border-t flex justify-end bg-white">
          <button
            onClick={requestMassSave}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2"
          >
            Guardar todos
            {saving && (
              <Check className="w-5 h-5 text-green-100 animate-ping" />
            )}
          </button>
        </div>

        {confirmData && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md animate-slideUp text-center">
              <AlertTriangle className="w-12 h-12 text-orange-500 mb-3 mx-auto" />

              <h3 className="text-xl font-bold mb-2">Confirmar cambios</h3>

              <p className="text-gray-700 mb-4">
                {confirmData.type === "multi"
                  ? "¿Guardar todos los cambios realizados?"
                  : `¿Guardar precio para ${confirmData.modulo}?`}
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setConfirmData(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  onClick={executeSave}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {showToast && <SuccessToast />}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

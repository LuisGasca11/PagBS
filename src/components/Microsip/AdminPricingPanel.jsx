import React, { useState, useEffect, useRef } from "react";
import { X, Save, Check, AlertTriangle } from "lucide-react";
import Portal from "./Portal";
import SuccessToast from "./SuccessToast";

export default function AdminPricingPanel({ pricesDB, onClose, onPriceUpdate }) {
  const [editablePrices, setEditablePrices] = useState(pricesDB);
  const [pendingChanges, setPendingChanges] = useState({});
  const [confirmData, setConfirmData] = useState(null);
  const [globalSaving, setGlobalSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  };

  const handleChange = (modulo, plan, newValue) => {
    const costo = Number(newValue);

    setEditablePrices((prev) => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [plan]: { ...prev[modulo][plan], costo }
      }
    }));

    setPendingChanges((prev) => ({
      ...prev,
      [`${modulo}_${plan}`]: { modulo, plan, value: costo }
    }));
  };

  const requestSave = (modulo, plan) => {
    setConfirmData({
      modulo,
      plan,
      value: editablePrices[modulo][plan].costo,
      type: "single",
    });
  };

  const requestMassSave = () => {
    if (Object.keys(pendingChanges).length === 0) {
      alert("No hay cambios por guardar.");
      return;
    }
    setConfirmData({ type: "multi" });
  };

  const executeSave = async () => {
    if (!confirmData) return;

    const isMulti = confirmData.type === "multi";
    const changes = isMulti
      ? Object.values(pendingChanges)
      : [confirmData];

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
    setGlobalSaving(true);

    try {
      for (const { modulo, plan, value } of changes) {
        await fetch(
          `http://localhost:3001/api/precios/${modulo}/${plan.toLowerCase()}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify({ costo: value }),
          }
        );
      }

      setPendingChanges({});
      setConfirmData(null);
      await onPriceUpdate();

      setTimeout(() => setGlobalSaving(false), 500);
    } catch (err) {
      alert("Error guardando cambios.");
      console.error(err);
      setGlobalSaving(false);
    }
  };

  return (
    <Portal>
      <div
        className="
          fixed inset-0 
          bg-black/40 backdrop-blur-xl 
          flex items-center justify-center 
          z-[9999]
          animate-fadeIn
        "
        onMouseDown={handleOutside}
      >
        <div
          ref={modalRef}
          className="
            bg-white/90 backdrop-blur-2xl
            rounded-2xl border border-white/40
            shadow-2xl
            w-full max-w-5xl max-h-[90vh]
            p-6 overflow-hidden
            animate-slideUp
            text-black
          "
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-300">
            <h2 className="text-3xl font-bold text-gray-900">
              Administrar Precios
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[65vh] mt-4 pr-1">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white/70 backdrop-blur-xl shadow-sm z-10">
                <tr>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    Módulo
                  </th>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    Plan
                  </th>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    Precio
                  </th>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    Acción
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(editablePrices).flatMap(
                  ([modulo, planes]) =>
                    Object.entries(planes).map(([plan, data], index) => {
                      const id = `${modulo}_${plan}`;
                      const isChanged = pendingChanges[id] !== undefined;

                      return (
                        <tr
                          key={`${modulo}-${plan}`}
                          className={`
                            border-b transition
                            ${isChanged ? "bg-yellow-50" : "hover:bg-gray-50"}
                          `}
                        >
                          {index === 0 && (
                            <td
                              rowSpan={Object.keys(planes).length}
                              className="
                                p-3 font-bold text-gray-900 
                                bg-gray-50/70 backdrop-blur-xl
                                w-40 align-top
                              "
                            >
                              {modulo}
                            </td>
                          )}

                          <td className="p-3 capitalize text-gray-700 w-36">
                            {plan}
                          </td>

                          <td className="p-3">
                            <input
                              type="number"
                              value={data.costo}
                              onChange={(e) =>
                                handleChange(modulo, plan, e.target.value)
                              }
                              className="
                                border-gray-300 rounded-lg px-3 py-1.5 
                                text-gray-800 w-28 
                                bg-white
                                focus:ring-2 focus:ring-blue-400
                                transition
                              "
                            />
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => requestSave(modulo, plan)}
                              disabled={!isChanged}
                              className={`
                                flex items-center gap-2 px-4 py-1.5 rounded-lg text-white 
                                transition transform
                                ${
                                  isChanged
                                    ? "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                                    : "bg-gray-400 cursor-not-allowed"
                                }
                              `}
                            >
                              <Save className="w-4 h-4" />
                              Guardar
                            </button>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-gray-300 flex justify-end bg-white">
            <button
              onClick={requestMassSave}
              className="
                px-5 py-2 rounded-lg 
                bg-green-600 text-white 
                shadow hover:bg-green-700 
                transform hover:scale-105 
                transition relative
              "
            >
              Guardar todos
              {globalSaving && (
                <Check className="w-5 h-5 absolute -right-8 top-1/2 -translate-y-1/2 text-green-600 animate-ping" />
              )}
            </button>
          </div>

          {showToast && <SuccessToast text="Cambios guardados" />}

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
                      : `¿Guardar el precio del plan "${confirmData.plan}" del módulo "${confirmData.modulo}"?`}
                  </p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setConfirmData(null)}
                      className="
                        px-4 py-2 rounded-lg 
                        bg-gray-200 text-gray-700 
                        hover:bg-gray-300 transition
                      "
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={executeSave}
                      className="
                        px-4 py-2 rounded-lg 
                        bg-blue-600 text-white 
                        hover:bg-blue-700 transform hover:scale-105 
                        transition
                      "
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

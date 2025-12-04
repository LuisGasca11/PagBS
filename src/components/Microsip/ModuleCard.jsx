import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, ChevronDown } from "lucide-react";

export default function ModuleCard({
  icon,
  name,
  prices,
  isSelected,
  onSelect,
  onDeselect,
  isAuthenticated,
}) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const buttonRef = useRef(null);

  const planLabels = {
    basico: "Básico (1 usuario)",
    ligero: "Ligero (2 usuarios)",
    pro: "Pro (3 usuarios)",
    premium: "Premium (5 usuarios)",
    corporativo: "Corporativo (10+ usuarios)",
    incrementos: "Incremento (5+ usuarios)",
  };

  const planKeys = Object.keys(planLabels);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropUp = spaceBelow < 280;

      setDropdownStyle({
        position: "fixed",
        width: rect.width,
        left: rect.left,
        top: dropUp ? "auto" : rect.bottom + 4,
        bottom: dropUp ? window.innerHeight - rect.top + 4 : "auto",
      });
    }
  }, [isOpen]);

  // Cerrar al hacer click afuera
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (key) => {
    setSelectedPlan(key);
    setIsOpen(false);
    onSelect(name, key, prices[key]);
    onSelect(name, key, prices[key]?.costo); 
  };

  const dropdown = isOpen && ReactDOM.createPortal(
    <div
      style={dropdownStyle}
      className="z-[99999] bg-white border border-gray-200 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
    >
      {planKeys.map((key) => (
        <button
          key={key}
          onClick={() => handleSelect(key)}
          disabled={prices[key]?.costo <= 0}
          className={`w-full px-4 py-2.5 text-left ${
            prices[key]?.costo > 0
              ? "text-black hover:bg-orange-50"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {planLabels[key]} — ${prices[key]?.costo}
        </button>
      ))}
    </div>,
    document.body
  );

  return (
    <div
      className={`border rounded-lg transition-colors ${
        isSelected
          ? "border-orange-500 bg-orange-50"
          : "hover:border-orange-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-black">{name}</span>
        </div>

        {isSelected ? (
          <div className="flex items-center gap-2">
            <span className="font-bold text-orange-600">
              ${prices[selectedPlan]?.costo}
            </span>
            <button
              onClick={() => {
                setSelectedPlan(null);
                onDeselect(name);
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <span className="text-gray-400">Seleccionar plan</span>
        )}
      </div>

      {/* Selector */}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 flex items-center justify-between hover:border-gray-400"
        >
          <span className="text-black">
            {selectedPlan ? planLabels[selectedPlan] : "Selecciona un plan"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {dropdown}
      </div>
    </div>
  );
}

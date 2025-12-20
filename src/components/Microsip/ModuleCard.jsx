import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, ChevronDown, Check } from "lucide-react";

export default function ModuleCard({
  icon,
  name,
  prices,
  isSelected,
  selectedPlanFromParent,
  onSelect,
  onDeselect,
  isAuthenticated,
}) {
  const [selectedPlan, setSelectedPlan] = useState(selectedPlanFromParent || null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

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
    setSelectedPlan(selectedPlanFromParent || null);
  }, [selectedPlanFromParent]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropUp = spaceBelow < 280;

      setDropdownStyle({
        position: "fixed",
        width: rect.width,
        left: rect.left,
        top: dropUp ? "auto" : rect.bottom + 8,
        bottom: dropUp ? window.innerHeight - rect.top + 8 : "auto",
        zIndex: 99999,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      const clickedButton = buttonRef.current?.contains(e.target);
      const clickedDropdown = dropdownRef.current?.contains(e.target);
      if (!clickedButton && !clickedDropdown) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const allPlansDisabled = planKeys.every(key => !prices[key]?.costo || prices[key]?.costo <= 0);

  const handleSelect = (key) => {
    const costo = prices[key]?.costo;
    if (!costo || costo <= 0) return;
    setSelectedPlan(key);
    setIsOpen(false);
    onSelect(name, key, costo);
  };

  const handleDeselect = () => {
    setSelectedPlan(null);
    onDeselect(name);
  };

  const dropdown = isOpen
    ? ReactDOM.createPortal(
        <>
          <div 
            className="fixed inset-0 z-[99998]"
            style={{ background: 'transparent' }}
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-white border-2 border-orange-200 rounded-xl shadow-2xl max-h-72 overflow-y-auto animate-slideDown"
          >
            <div className="p-2 space-y-1">
              {planKeys.map((key) => {
                const isDisabled = prices[key]?.costo <= 0;
                const isCurrentPlan = selectedPlan === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={isDisabled}
                    className={`
                      w-full px-3 sm:px-4 py-2 sm:py-3 text-left rounded-lg transition-all duration-200
                      flex items-center justify-between group text-sm sm:text-base
                      ${isDisabled
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : isCurrentPlan
                        ? "bg-orange-100 text-orange-700 font-semibold"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      {isCurrentPlan && !isDisabled && (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{planLabels[key]}</div>
                      </div>
                    </div>
                    
                    <span className={`font-bold text-xs sm:text-sm ml-2 flex-shrink-0 ${
                      isDisabled ? "text-gray-400" : 
                      isCurrentPlan ? "text-orange-600" : 
                      "text-gray-600 group-hover:text-orange-600"
                    }`}>
                      ${prices[key]?.costo || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <div
      className={`
        relative border-2 rounded-xl p-3 sm:p-5 transition-all duration-300
        ${allPlansDisabled
          ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
          : isSelected
          ? "border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-lg shadow-orange-100"
          : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-md"
        }
      `}
    >
      {allPlansDisabled && (
        <div className="absolute -top-2 -right-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-400 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
          No disponible
        </div>
      )}

      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className={`
            p-1.5 sm:p-2 rounded-lg transition-all duration-300 flex-shrink-0
            ${allPlansDisabled ? "bg-gray-100 opacity-50" : isSelected ? "bg-white shadow-md" : "bg-gray-50"}
          `}>
            {React.cloneElement(icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
          </div>
          <span className={`font-semibold text-sm sm:text-base truncate ${
            allPlansDisabled ? "text-gray-400" : "text-gray-800"
          }`}>
            {name}
          </span>
        </div>

        {isSelected ? (
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white rounded-lg shadow-sm">
              <span className="font-bold text-orange-600 text-sm sm:text-lg whitespace-nowrap">
                ${prices[selectedPlan]?.costo || 0}
              </span>
            </div>
            <button
              onClick={handleDeselect}
              className="p-1 sm:p-1.5 rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Deseleccionar módulo"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        ) : (
          <span className={`text-xs sm:text-sm font-medium flex-shrink-0 ${
            allPlansDisabled ? "text-gray-400" : "text-gray-400"
          }`}>
            {allPlansDisabled ? "No disponible" : "Sin seleccionar"}
          </span>
        )}
      </div>

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => !allPlansDisabled && setIsOpen(!isOpen)}
          disabled={allPlansDisabled}
          className={`
            w-full border-2 rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between 
            transition-all duration-300 group text-sm sm:text-base
            ${allPlansDisabled
              ? "border-gray-200 bg-gray-100 cursor-not-allowed"
              : isOpen
              ? "border-orange-400 bg-orange-50 shadow-md"
              : isSelected
              ? "border-orange-300 bg-white hover:border-orange-400"
              : "border-gray-300 bg-white hover:border-orange-300 hover:bg-orange-50/50"
            }
          `}
        >
          <span className={`font-medium truncate pr-2 ${
            allPlansDisabled ? "text-gray-400" :
            selectedPlan ? "text-gray-800" : "text-gray-500"
          }`}>
            {allPlansDisabled 
              ? "Módulo no disponible" 
              : selectedPlan 
              ? planLabels[selectedPlan] 
              : "Selecciona un plan"
            }
          </span>
          <ChevronDown
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 flex-shrink-0 ${
              allPlansDisabled ? "text-gray-300" :
              isOpen 
                ? "rotate-180 text-orange-500" 
                : "text-gray-400 group-hover:text-orange-500"
            }`}
          />
        </button>
        {dropdown}
      </div>

      {isSelected && !allPlansDisabled && (
        <div className="absolute -top-2 -right-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
          Seleccionado
        </div>
      )}
    </div>
  );
}
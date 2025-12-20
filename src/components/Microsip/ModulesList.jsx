import ModuleCard from "./ModuleCard";
import { Package } from "lucide-react";

export default function ModulesList({
  modulesList,
  moduleSelections,
  setModuleSelections,
  pricesDB,
  isAuthenticated,
}) {
  const handleSelect = (moduleName, plan, price) => {
    setModuleSelections((prev) => ({
      ...prev,
      [moduleName]: { plan, price },
    }));
  };

  const handleDeselect = (moduleName) => {
    setModuleSelections((prev) => {
      const updated = { ...prev };
      delete updated[moduleName];
      return updated;
    });
  };

  const visibleModules = modulesList.filter(
    (m) => !m.requiresAuth || isAuthenticated
  );

  const selectedCount = Object.keys(moduleSelections).length;
  const totalPrice = Object.values(moduleSelections).reduce(
    (sum, { price }) => sum + (price || 0),
    0
  );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 lg:p-8 overflow-visible">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-gray-100 gap-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg flex-shrink-0">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Módulos en suscripción
            </h3>
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg">
              <span className="text-xs font-medium">Total mensual</span>
              <div className="text-xl sm:text-2xl font-bold">${totalPrice.toFixed(2)}</div>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {selectedCount} módulo{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="sm:hidden mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-600 font-medium">Total mensual</span>
              <div className="text-xl sm:text-2xl font-bold text-orange-600">${totalPrice.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-600">
                {selectedCount} módulo{selectedCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4 overflow-visible">
        {visibleModules.length > 0 ? (
          visibleModules.map((m, i) => (
            <div
              key={i}
              className="animate-slideInUp"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <ModuleCard
                name={m.name}
                icon={m.icon}
                prices={pricesDB[m.name] || {}}
                isSelected={!!moduleSelections[m.name]}
                selectedPlanFromParent={moduleSelections[m.name]?.plan}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                isAuthenticated={isAuthenticated}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium text-sm sm:text-base">No hay módulos disponibles</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {!isAuthenticated && "Inicia sesión para ver todos los módulos"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import ModuleCard from "./ModuleCard";

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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-visible">
      <h3 className="text-xl font-bold text-black mb-6">
        Módulos en suscripción
      </h3>

      <div className="space-y-4 overflow-visible">
        {visibleModules.map((m, i) => (
          <ModuleCard
            key={i}
            name={m.name}
            icon={m.icon}
            prices={pricesDB[m.name] || {}}
            isSelected={!!moduleSelections[m.name]}
            selectedPlanFromParent={moduleSelections[m.name]?.plan} 
            onSelect={handleSelect}
            onDeselect={handleDeselect}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}
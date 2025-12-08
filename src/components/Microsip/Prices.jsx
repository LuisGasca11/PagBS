import React, { useState, useEffect } from "react";
import { fetchAllPrices, fetchHourlyPrices } from "./utils/fetchPrices";
import { loadSession, clearSession, extendSession, getSessionExpiration } from "./utils/auth";

import modulesList from "./utils/modulesList";
import calculateTotals from "./utils/calculateTotals";

import NavBar from "./NavbarMicro";
import LoginModal from "./LoginModal";
import SubscriptionInfo from "./SubscriptionInfo";
import ModulesList from "./ModulesList";
import VpsPlans from "./VPSPlans";
import HourlyRentals from "./HourlyRentals";
import PriceSummary from "./PriceSummary";
import AdminPricingPanel from "./AdminPricingPanel";
import AdminVpsPanel from "./VpsPricingPanel";
import AdminHourlyPanel from "./AdminHourlyPanel";
import SessionWarning from "./SessionWarning";
import MicrosipFooter from "./MicrosipFooter";
import DownloadPresentation from "./DownloadPresentation";
import DownloadPDF from "./DownloadPDF";

export default function MicrosipPricing() {
  const [paymentFrequency, setPaymentFrequency] = useState("Mensual");
  const [moduleSelections, setModuleSelections] = useState({});
  const [hourRentals, setHourRentals] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const exchangeRate = 2.86; 
  
  const [activeTab, setActiveTab] = useState("modulos");
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [pricesDB, setPricesDB] = useState({});
  const [hourlyPricesDB, setHourlyPricesDB] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAdminVpsPanel, setShowAdminVpsPanel] = useState(false);
  const [showAdminHourlyPanel, setShowAdminHourlyPanel] = useState(false);
  const [sessionWarning, setSessionWarning] = useState(false);
  const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);
  const [logoutClosing, setLogoutClosing] = useState(false);
  const [selectedVps, setSelectedVps] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [vpsPlans, setVpsPlans] = useState([]);

  const userPlanSelected = userCount > 0;     
  const vpsSelected = selectedVps.length > 0;   

  
  useEffect(() => {
    fetch("/api/vps")
    .then(res => res.json())
    .then(setVpsPlans)
    .catch(() => setVpsPlans([]));
  }, []);
  
  const userPlan = vpsPlans.find(
    p => p.vcores === null && p.memoria_gb === null && p.almacenamiento_gb === null
  );
  
  const reloadPrices = async () => {
    const updated = await fetchAllPrices();
    setPricesDB(updated);
  };
  
  useEffect(() => {
    document.title = "PRECIOS | black_sheep";
    fetchAllPrices().then(setPricesDB);
    fetchHourlyPrices().then(setHourlyPricesDB);
    
    const sessionUser = loadSession();
    if (sessionUser) {
      setIsAuthenticated(true);
      setUsername(sessionUser.username);
    }
    return () => (document.title = "Black-Sheep");
  }, []);
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const events = ["click", "keypress", "mousemove", "scroll"];
    const refreshActivity = () => extendSession();
    events.forEach((e) => window.addEventListener(e, refreshActivity));

    const checkInterval = setInterval(() => {
      const expires = getSessionExpiration();
      if (!expires) return;
      
      const remaining = expires - Date.now();
      if (remaining < 120000 && remaining > 0) {
        setSessionWarning(true);
      }
      if (remaining <= 0) {
        setSessionWarning(false);
        handleLogout();
      }
    }, 15000);
    
    return () => {
      events.forEach((e) => window.removeEventListener(e, refreshActivity));
      clearInterval(checkInterval);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (vpsSelected && userCount > 0) {
      alert("Solo puedes seleccionar un plan VPS o Usuarios, no ambos.");
      setUserCount(0);
    }
  }, [vpsSelected]);

  useEffect(() => {
    if (userPlanSelected && selectedVps.length > 0) {
      alert("Solo puedes seleccionar usuarios o un plan VPS, no ambos.");
      setSelectedVps([]);
    }
  }, [userPlanSelected]);
  
  const totals = calculateTotals({
    moduleSelections,
    hourRentals,
    modulesList,
    pricesDB,
    paymentFrequency,
    userPlan,
    userCount,
    selectedVps
  });
  
  const handleLogout = () => {
    setShowLogoutAnimation(true);
    setTimeout(() => setLogoutClosing(true), 900);
    setTimeout(() => {
      clearSession();
      setIsAuthenticated(false);
      setUsername("");
      setShowLogoutAnimation(false);
      setLogoutClosing(false);
    }, 1300);
  };

  const getNextTab = (currentTab) => {
    if (currentTab === "modulos") return "vps";
    if (currentTab === "vps") {
      return isAuthenticated ? "renta" : "resumen";
    }
    if (currentTab === "renta") return "resumen";
    if (currentTab === "resumen") return "descargas";
    return currentTab;
  };

  const handleNextTab = () => {
    setActiveTab(getNextTab(activeTab));
  };
  
  const tabs = [
    { id: "modulos", label: "Módulos", auth: false },
    { id: "vps", label: "VPS", auth: false },
    { id: "renta", label: "Renta por Hora", auth: true },
    { id: "resumen", label: "Resumen", auth: false },
    { id: "descargas", label: "Descargas", auth: true }
  ];
  
  const visibleTabs = tabs.filter(tab => !tab.auth || isAuthenticated);
  
  return (
    <>
      <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 relative bg-white">
        <div className="relative w-full">
          <a
            href="/MicroPage"
            className={`fixed top-3 sm:top-4 left-3 sm:left-4 z-[60] transition-all duration-300 
              ${scrollY > 80 ? "scale-75 translate-y-[-10px]" : "scale-100"}
            `}
          >
            <img
              src="/msppart.webp"
              alt="logo"
              className="h-10 sm:h-12 object-contain"
            />
          </a>
      
          <NavBar
            isAuthenticated={isAuthenticated}
            username={username}
            onLoginClick={() => setShowLoginModal(true)}
            onLogoutClick={handleLogout}
            onOpenAdmin={() => setShowAdminPanel(true)}
            onOpenVpsAdmin={() => setShowAdminVpsPanel(true)}
            onOpenHourlyAdmin={() => setShowAdminHourlyPanel(true)}
          />
        </div>

        <div className="pt-20 sm:pt-32 pb-12 sm:pb-20 px-3 sm:px-6 flex justify-center">
          <div className="w-full max-w-6xl space-y-8 sm:space-y-12">

         <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:p-6">
              <SubscriptionInfo />
            </section>

            <div className="bg-orange-500 rounded-2xl shadow-2xl p-6 border border-gray-200">
              <div className="flex flex-wrap items-center gap-4 justify-center text-black">
                {visibleTabs.map((tab, index) => {
                  const isActive = activeTab === tab.id;
                  const isLast = index === visibleTabs.length - 1;

                  const tabColors = {
                    modulos: "bg-white",
                    vps: "bg-white",
                    renta: "bg-white",
                    resumen: "bg-white",
                    descargas: "bg-white"
                  };

                  const tabColor = tabColors[tab.id] || "from-orange-500 to-orange-400";

                  return (
                    <div
                      key={tab.id}
                      className={`relative ${!isLast ? 'mr-[-20px]' : ''}`}
                      style={{ zIndex: isActive ? 20 : 10 - index }}
                    >
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          relative flex items-center justify-center 
                          min-w-[170px] h-16 px-8 py-4
                          font-bold text-base transition-all duration-500
                          transform hover:scale-105
                          ${isActive ? 'border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'border border-orange-200'}
                          ${isActive
                            ? `bg-gradient-to-r ${tabColor} text-black shadow-2xl`
                            : "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-700 hover:from-gray-300 hover:to-gray-200 shadow-md"
                          }
                        `}
                        style={{
                          clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)",
                          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                      >
                        <div 
                          className={`
                            absolute inset-0 opacity-0 transition-opacity duration-500
                            ${isActive ? "opacity-20" : ""}
                          `}
                          style={{
                            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)",
                            background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)"
                          }}
                        />

                        <span className={`relative z-10 tracking-wide ${isActive ? 'drop-shadow-md' : ''}`}>
                          {tab.label}
                        </span>

                        <div 
                          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
                          style={{
                            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)"
                          }}
                        >
                          <div 
                            className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shine"
                          />
                        </div>
                      </button>

                      {isActive && (
                        <div 
                          className="absolute inset-0 animate-pulse-slow"
                          style={{
                            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)",
                            filter: "blur(8px)",
                            opacity: 0.4,
                            zIndex: -1
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="min-h-[400px]">
              {activeTab === "modulos" && (
                <section className="bg-gradient-to-r from-orange-500 to-orange-500 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-fade-in">
                  <ModulesHeader title="Módulos del Sistema" />
                  <ModulesList
                    modulesList={modulesList}
                    moduleSelections={moduleSelections}
                    setModuleSelections={setModuleSelections}
                    pricesDB={pricesDB}
                    isAuthenticated={isAuthenticated}
                  />
                  {Object.keys(moduleSelections).length > 0 && (
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={handleNextTab}
                        className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        Continuar a VPS
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </section>
              )}

              {activeTab === "vps" && (
                <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-fade-in">
                  <ModulesHeader title="Planes VPS" />
                    <VpsPlans
                      selectedVps={selectedVps}
                      setSelectedVps={setSelectedVps}
                      userCount={userCount}
                      setUserCount={setUserCount}
                      userPlanSelected={userPlanSelected}
                      vpsSelected={vpsSelected}
                    />
                    {(selectedVps.length > 0 || userCount > 0) && (
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={handleNextTab}
                        className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        {isAuthenticated ? "Continuar a Renta por Hora" : "Continuar a Resumen"}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </section>
              )}

              {activeTab === "renta" && isAuthenticated && (
                <section className="bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-fade-in">
                  <ModulesHeader title="Renta por Hora" />
                  <HourlyRentals
                    hourRentals={hourRentals}
                    setHourRentals={setHourRentals}
                    hourlyPricesDB={hourlyPricesDB}
                    isAuthenticated={isAuthenticated}
                  />
                </section>
              )}

              {activeTab === "resumen" && (
                <section className="bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-fade-in">
                  <ModulesHeader title="Resumen Final" />
                  <PriceSummary
                    totals={totals}
                    paymentFrequency={paymentFrequency}
                    setPaymentFrequency={setPaymentFrequency}
                    userCount={userCount}
                    userPlan={userPlan}
                    exchangeRate={exchangeRate}
                  />
                </section>
              )}

              {activeTab === "descargas" && isAuthenticated &&(
                <div className="space-y-6 animate-fade-in">
                  <section className="bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                    <ModulesHeader title="Descargar Presentación" />
                    <DownloadPresentation
                      moduleSelections={moduleSelections}
                      totals={totals}
                      paymentFrequency={paymentFrequency}
                    />
                  </section>

                  <section className="bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                    <ModulesHeader title="Descargar PDF" />
                    <DownloadPDF
                      moduleSelections={moduleSelections}
                      totals={totals}
                      paymentFrequency={paymentFrequency}
                      userCount={userCount}
                    />
                  </section>
                </div>
              )}
            </div>

          </div>
        </div>

        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onSuccess={(user) => {
              setIsAuthenticated(true);
              setUsername(user.username);
              setShowLoginModal(false);
              setShowLoginSuccess(true);
              setTimeout(() => setShowLoginSuccess(false), 1000);
            }}
          />
        )}

        {showAdminPanel && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <AdminPricingPanel
                pricesDB={pricesDB}
                onClose={() => setShowAdminPanel(false)}
                onPriceUpdate={reloadPrices}
              />
            </div>
          </div>
        )}

        {showAdminVpsPanel && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <AdminVpsPanel onClose={() => setShowAdminVpsPanel(false)} />
            </div>
          </div>  
        )}

        {showAdminHourlyPanel && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <AdminHourlyPanel
                hourlyPricesDB={hourlyPricesDB}
                onClose={() => setShowAdminHourlyPanel(false)}
              />
            </div>
          </div>    
        )}

        {sessionWarning && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full">
              <SessionWarning
                onContinue={() => {
                  extendSession();
                  setSessionWarning(false);
                }}
                onLogout={() => {
                  setSessionWarning(false);
                  handleLogout();
                }}
              />
            </div>
          </div>    
        )}
      </div>

      <section className="bg-black">
        <MicrosipFooter className="mt-12 sm:mt-16 lg:mt-20"/>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>  
  );
}

function ModulesHeader({ title }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 sm:mb-6 lg:mb-8">
      {title}
    </h2>
  );
}
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

  const tabs = [
    { id: "modulos", label: "Módulos", auth: false },
    { id: "vps", label: "VPS", auth: false },
    { id: "renta", label: "Renta por Hora", auth: true },
    { id: "resumen", label: "Resumen", auth: false },
    { id: "descargas", label: "Descargas", auth: false }
  ];

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

            {/* Subscription Info - Siempre visible */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:p-6">
              <SubscriptionInfo />
            </section>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-2">
              <div className="flex flex-wrap gap-2">
                {tabs.map(tab => {
                  if (tab.auth && !isAuthenticated) return null;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex-1 min-w-[120px] px-4 py-3 rounded-lg font-semibold
                        transition-all duration-300
                        ${activeTab === tab.id
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
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
                  />
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

              {activeTab === "descargas" && (
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

        {/* MODALS */}
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
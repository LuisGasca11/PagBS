import React, { useState, useEffect } from "react";
import { fetchAllPrices, fetchHourlyPrices } from "./utils/fetchPrices";
import { loadSession, clearSession, extendSession, getSessionExpiration } from "./utils/auth";

import modulesList from "./utils/modulesList";
import calculateTotals from "./utils/calculateTotals";

import NavBar from "./NavbarMicro";
import Toolbar from "./Toolbar";
import LoginModal from "./LoginModal";
import SubscriptionInfo from "./SubscriptionInfo";
import ModulesList from "./ModulesList";
import VpsPlans from "./VPSPlans";
import HourlyRentals from "./HourlyRentals";
import PriceSummary from "./PriceSummary";
import DownloadPresentation from "./DownloadPresentation";
import AdminPricingPanel from "./AdminPricingPanel";
import AdminVpsPanel from "./VpsPricingPanel";
import AdminHourlyPanel from "./AdminHourlyPanel";
import SessionWarning from "./SessionWarning";
import MicrosipFooter from "./MicrosipFooter";

export default function MicrosipPricing() {

  const [paymentFrequency, setPaymentFrequency] = useState("Mensual");
  const [moduleSelections, setModuleSelections] = useState({});
  const [hourRentals, setHourRentals] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  
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
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const totals = calculateTotals({
    moduleSelections: JSON.parse(JSON.stringify(moduleSelections)),
    hourRentals: JSON.parse(JSON.stringify(hourRentals)),
    modulesList,
    pricesDB,
    paymentFrequency,
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

  return (
  <>
    <div className="min-h-screen py-10 px-6 relative  bg-white">
      <div className="relative w-full">
        <a
          href="/MicroPage"
          className={`fixed top-4 left-4 z-[60] transition-all duration-300 
            ${scrollY > 80 ? "scale-75 translate-y-[-10px]" : "scale-100"}
          `}
        >
          <img
            src="/msppart.webp"
            alt="logo"
            className="h-12 sm:h-12 object-contain"
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

      <div className="pt-32 pb-20 px-6 flex justify-center">
        <div className="w-full max-w-6xl space-y-16">

          <section className="reveal bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
            <SubscriptionInfo />
          </section>

          <Separator />

          <section className="reveal bg-gradient-to-r from-orange-500 to-orange-500 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <ModulesHeader title="Módulos del Sistema" />
            <ModulesList
              modulesList={modulesList}
              moduleSelections={moduleSelections}
              setModuleSelections={setModuleSelections}
              pricesDB={pricesDB}
              isAuthenticated={isAuthenticated}
            />
          </section>

          <Separator />

          <section className="reveal bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <ModulesHeader title="Planes VPS" />
            <VpsPlans />
          </section>

          <Separator />

          {isAuthenticated && (
            <section className="reveal bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
              <ModulesHeader title="Renta por Hora" />
              <HourlyRentals
                hourRentals={hourRentals}
                setHourRentals={setHourRentals}
                hourlyPricesDB={hourlyPricesDB}
                isAuthenticated={isAuthenticated}
              />
            </section>
          )}

          <Separator />

          <section className="reveal bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <ModulesHeader title="Resumen Final" />
            <PriceSummary
              totals={totals}
              paymentFrequency={paymentFrequency}
              setPaymentFrequency={setPaymentFrequency}
            />
          </section>

          <Separator />

          <section className="reveal bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <ModulesHeader title="Descargar Presentación" />
            <DownloadPresentation
              moduleSelections={moduleSelections}
              totals={totals}
              paymentFrequency={paymentFrequency}
            />
          </section>
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
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full">
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
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full">
            <AdminVpsPanel onClose={() => setShowAdminVpsPanel(false)} />
          </div>
        </div>  
      )}

      {showAdminHourlyPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full">
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
          <MicrosipFooter className="mt-20"/>
      </section>
    </>  
  );
}

function Separator() {
  return (
    <div className="relative my-6 sm:my-8 lg:my-12">
       <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
       <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent blur-sm" />
    </div>  );
}

function ModulesHeader({ title }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 sm:mb-6 lg:mb-8">
      {title}
    </h2>
  );
}

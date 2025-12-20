import React, { useState, useEffect } from "react";
import { fetchAllPrices, fetchHourlyPrices } from "./utils/fetchPrices";
import { loadSession, clearSession, extendSession, getSessionExpiration } from "./utils/auth";
import { useExchangeRate } from "./utils/useExchange";

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
import AdminUsersPanel from "./AdminUsersPanel";
import AdminVpsPanel from "./VpsPricingPanel";
import AdminHourlyPanel from "./AdminHourlyPanel";
import AdminDocuments from "./AdminDocuments";

import SessionWarning from "./SessionWarning";
import MicrosipFooter from "./MicrosipFooter";
import DownloadPresentation from "./DownloadPresentation";
import DownloadPDF from "./DownloadPDF";

export default function MicrosipPricing() {
    const [paymentFrequency, setPaymentFrequency] = useState("Mensual");
    const [moduleSelections, setModuleSelections] = useState({});
    const [hourRentals, setHourRentals] = useState([]);
    const [scrollY, setScrollY] = useState(0);
    const [localUserSelected, setLocalUserSelected] = useState(false);

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
    const [showAdminUsersPanel, setShowAdminUsersPanel] = useState(false);
    const [showAdminDocumentsPanel, setShowAdminDocumentsPanel] = useState(false);
    const [sessionWarning, setSessionWarning] = useState(false);
    const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);
    const [logoutClosing, setLogoutClosing] = useState(false);
    const [selectedVps, setSelectedVps] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [vpsPlans, setVpsPlans] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [tabKey, setTabKey] = useState(0);

    const { exchangeRate, loading: exchangeLoading, error: exchangeError, lastUpdate } = useExchangeRate();

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

        const sessionData = loadSession();

        if (sessionData && sessionData.user) {
            setIsAuthenticated(true);
            setUsername(sessionData.user.usuario);
            setUserRole(sessionData.user.rol);
        }

        if (sessionStorage.getItem('openDocumentsModal') === 'true') {
            sessionStorage.removeItem('openDocumentsModal');
            setTimeout(() => setShowAdminDocumentsPanel(true), 300);
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
        selectedVps,
        exchangeRate
    });

    const handleLoginSuccess = (user) => {
        setIsAuthenticated(true);
        setUsername(user.usuario);
        setUserRole(user.rol);
        setShowLoginModal(false);
        setShowLoginSuccess(true);
        
        setTimeout(() => {
            setShowLoginSuccess(false);
        }, 2000);
    };

    const handleLogout = () => {
        setShowLogoutAnimation(true);
        setTimeout(() => setLogoutClosing(true), 900);
        setTimeout(() => {
            clearSession();
            setIsAuthenticated(false);
            setUsername("");
            setUserRole(null);
            setShowLogoutAnimation(false);
            setLogoutClosing(false);
        }, 1300);
    };

    const handleOpenAdmin = () => {
        if (userRole === "admin") {
            setShowAdminPanel(true);
        }
    };

    const handleOpenVpsAdmin = () => {
        if (userRole === "admin") {
            setShowAdminVpsPanel(true);
        }
    };

    const handleOpenHourlyAdmin = () => {
        if (userRole === "admin") {
            setShowAdminHourlyPanel(true);
        }
    };

    const handleOpenUsersAdmin = () => {
        if (userRole === "admin") {
            setShowAdminUsersPanel(true);
        }
    };

    const handleOpenDocuments = () => {
        if (userRole === "admin" || userRole === "user") {
            setShowAdminDocumentsPanel(true);
        }
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

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setTabKey(prevKey => prevKey + 1);
    };

    const handleNextTab = () => {
        const nextTab = getNextTab(activeTab);
        handleTabChange(nextTab);
    };

    const tabs = [
        { id: "modulos", label: "Módulos", auth: false },
        { id: "vps", label: "Servicios", auth: false },
        { id: "renta", label: "Implementación", auth: true },
        { id: "resumen", label: "Resumen", auth: false },
        { id: "descargas", label: "Descargas", auth: true }
    ];

    const visibleTabs = tabs.filter(tab => !tab.auth || isAuthenticated);

    return (
        <>
            <div className={`min-h-screen py-6 sm:py-10 px-4 sm:px-6 relative bg-white ${logoutClosing ? 'animate-fade-out-screen' : ''}`}>
                {exchangeLoading && (
                    <div className="fixed top-20 right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-shake">
                        Actualizando tipo de cambio...
                    </div>
                )}
                
                {showLoginSuccess && (
                    <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-xl text-sm z-50 animate-bounce-in">
                        ¡Bienvenido, {username}!
                    </div>
                )}

                <div className="relative w-full">
                    <a
                        href="/MicroPage"
                        className={`fixed top-3 sm:top-4 left-3 sm:left-4 z-[70] transition-all duration-300 
                            ${scrollY > 80 ? "scale-75 translate-y-[-10px]" : "scale-100"}
                        `}
                    >
                        <img
                            src="/msppart.webp"
                            alt="logo"
                            className="h-10 sm:h-12 object-contain z-50"
                        /> 
                    </a>

                    <NavBar
                        isAuthenticated={isAuthenticated}
                        username={username}
                        userRole={userRole}
                        onLoginClick={() => setShowLoginModal(true)}
                        onLogoutClick={handleLogout}
                        onOpenAdmin={handleOpenAdmin}
                        onOpenVpsAdmin={handleOpenVpsAdmin}
                        onOpenHourlyAdmin={handleOpenHourlyAdmin}
                        onOpenUsersAdmin={handleOpenUsersAdmin}
                        onOpenDocuments={handleOpenDocuments}
                    />
                </div>

                <div className="pt-20 sm:pt-32 pb-12 sm:pb-20 px-3 sm:px-6 flex justify-center">
                    <div className="w-full max-w-6xl space-y-8 sm:space-y-12">

                        <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 lg:p-6 animate-slide-in-up-slow">
                            <SubscriptionInfo />
                        </section>

                        <div className="bg-orange-500 rounded-2xl shadow-2xl p-6 border border-gray-200 animate-slide-in-up-delay-200">
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
                                                onClick={() => handleTabChange(tab.id)}
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
                                                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 overflow-hidden"
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
                                                        zIndex: -1,
                                                        background: "rgba(249, 115, 22, 1)"
                                                    }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="min-h-[400px]" key={tabKey}>
                            {activeTab === "modulos" && (
                                <section className="bg-gradient-to-r from-orange-500 to-orange-500 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-slide-in-right">
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
                                                className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-on-hover flex items-center gap-2"
                                            >
                                                Continuar a Servicios
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </section>
                            )}

                            {activeTab === "vps" && (
                                <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-slide-in-right">
                                    <ModulesHeader title="Planes en la nube" />
                                    <VpsPlans
                                        selectedVps={selectedVps}
                                        setSelectedVps={setSelectedVps}
                                        userCount={userCount}
                                        setUserCount={setUserCount}
                                        localUserSelected={localUserSelected}
                                        setLocalUserSelected={setLocalUserSelected}
                                    />
                                    {(selectedVps.length > 0 || userCount > 0) && (
                                        <div className="flex justify-end mt-6">
                                            <button
                                                onClick={handleNextTab}
                                                className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-on-hover flex items-center gap-2"
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
                                <section className="bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-slide-in-right">
                                    <ModulesHeader title="Implementación de módulos por Hora" />
                                    <HourlyRentals
                                        hourRentals={hourRentals}
                                        setHourRentals={setHourRentals}
                                        hourlyPricesDB={hourlyPricesDB}
                                        selectedModules={Object.keys(moduleSelections)}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <div className="flex justify-end mt-6">
                                        <button
                                            onClick={handleNextTab}
                                            className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-on-hover flex items-center gap-2"
                                        >
                                            Continuar a Resumen
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </section>
                            )}

                            {activeTab === "resumen" && (
                                <section className="bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 animate-slide-in-right">
                                    <ModulesHeader title="Resumen Final" />
                                    <PriceSummary
                                        totals={totals}
                                        paymentFrequency={paymentFrequency}
                                        setPaymentFrequency={setPaymentFrequency}
                                        userCount={userCount}
                                        userPlan={userPlan}
                                        exchangeRate={exchangeRate}
                                        lastUpdate={lastUpdate}
                                        moduleSelections={moduleSelections}
                                    />
                                    {isAuthenticated && (
                                        <div className="flex justify-end mt-6">
                                            <button
                                                onClick={handleNextTab}
                                                className="bg-white hover:bg-gray-100 text-orange-500 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-on-hover flex items-center gap-2"
                                            >
                                                Continuar a Descargas
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </section>
                            )}

                            {activeTab === "descargas" && isAuthenticated && (
                                <div className="space-y-6 animate-slide-in-right">
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
                        onSuccess={handleLoginSuccess}
                    />
                )}

                {sessionWarning && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full animate-modal-in">
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

                {showAdminUsersPanel && userRole === "admin" && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <AdminUsersPanel onClose={() => setShowAdminUsersPanel(false)} />
                    </div>
                )}

                {showAdminPanel && userRole === "admin" && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
                            <AdminPricingPanel
                                pricesDB={pricesDB}
                                onClose={() => setShowAdminPanel(false)}
                                onPriceUpdate={reloadPrices}
                            />
                        </div>
                    </div>
                )}

                {showAdminVpsPanel && userRole === "admin" && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
                            <AdminVpsPanel onClose={() => setShowAdminVpsPanel(false)} />
                        </div>
                    </div>
                )}

                {showAdminHourlyPanel && userRole === "admin" && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
                            <AdminHourlyPanel
                                hourlyPricesDB={hourlyPricesDB}
                                onClose={() => setShowAdminHourlyPanel(false)}
                            />
                        </div>
                    </div>
                )}

                {showAdminDocumentsPanel && (userRole === "admin" || userRole === "user") && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
                            <AdminDocuments
                                token={loadSession()?.token}
                                isAdmin={userRole === "admin"}
                                onClose={() => setShowAdminDocumentsPanel(false)}
                            />
                        </div>
                    </div>
                )}

                {/* Animación de logout */}
                {showLogoutAnimation && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl animate-scaleIn mx-4">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <p className="text-base sm:text-lg font-semibold text-gray-800">Cerrando sesión...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <section className="bg-black">
                <MicrosipFooter className="mt-12 sm:mt-16 lg:mt-20" />
            </section>

            <style jsx>{`
                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                
                @keyframes slide-in-up-slow {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-in-up-slow {
                    animation: slide-in-up-slow 0.8s ease-out;
                }
                .animate-slide-in-up-delay-200 {
                    animation: slide-in-up-slow 0.8s ease-out 0.2s forwards;
                    opacity: 0;
                }

                @keyframes shine {
                    0% {
                        transform: translateX(-100%) skewX(12deg);
                    }
                    100% {
                        transform: translateX(200%) skewX(12deg);
                    }
                }
                .animate-shine {
                    animation: shine 1.5s infinite;
                    animation-play-state: paused;
                }
                
                button:hover .animate-shine {
                    animation-play-state: running;
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.6; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .animate-pulse-on-hover:hover {
                    animation: pulse-on-hover 1s infinite;
                }
                @keyframes pulse-on-hover {
                    0% { box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4); }
                    50% { box-shadow: 0 4px 20px rgba(249, 115, 22, 0.8); }
                    100% { box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4); }
                }

                @keyframes modal-in {
                    from { opacity: 0; transform: translateY(-50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-modal-in {
                    animation: modal-in 0.3s ease-out;
                }
                
                @keyframes bounce-in {
                    0% { opacity: 0; transform: scale(0.5); }
                    70% { opacity: 1; transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.4s ease-out;
                }
                
                @keyframes fade-out-screen {
                    from { opacity: 1; filter: blur(0px); }
                    to { opacity: 0; filter: blur(10px); }
                }
                .animate-fade-out-screen {
                    animation: fade-out-screen 1.3s ease-in forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes scaleIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.95) translateY(-10px);
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1) translateY(0);
                    }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
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
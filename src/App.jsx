import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
//black_sheep
import Background from './components/Background/Background';
import Navbar from './components/Navbar/Navbar';
import Body from './components/Body';
import { SocialProof } from './components/Brands/SocialProof';
import Cards from './components/Cards/Cards';
import EquipoPage from './components/Team/EquipoPage';
import { CTASection } from './components/CTA-Section/cta-section';
import { LargeTestimonial } from './components/Testimonials/LargeTestimonial';
import { ContactSection } from './components/Form/FormKR';
import { FAQSection } from './components/FAQ/faqdata';
import { FooterSection } from './components/Footer/FooterV0';

import BmktPage from './components/BMKT/BmktPage';
import Landing from './components/BMKT/Landing';

//Microsip
import MicroPage from './components/Microsip/MicroPage';
import SistemaMicrosip from './components/Microsip/SistemaMicrosip';
import Krkn from './components/Krkn/Krkn';
import FormMicro from './components/Microsip/FormMicro';
import Sat from './components/Microsip/SAT';
import Prices from './components/Microsip/Prices';
import Experiencia from './components/Microsip/experiencia';

//Modules
import Bancos from './components/Microsip/Moduls/1';
import Contabilidad from './components/Microsip/Moduls/2';
import Nomina from './components/Microsip/Moduls/3';
import CeoMovil from './components/Microsip/Moduls/4';
import CuentasPagar from './components/Microsip/Moduls/5';
import Compras from './components/Microsip/Moduls/6';
import Inventarios from './components/Microsip/Moduls/7';
import CuentasCobrar from './components/Microsip/Moduls/8';
import SyncE from './components/Microsip/Moduls/9';
import Ventas from './components/Microsip/Moduls/10';
import PuntoVenta from './components/Microsip/Moduls/11';
import EnRuta from './components/Microsip/Moduls/12';
import AdminSuc from './components/Microsip/Moduls/13';

function AppContent() {
  const location = useLocation();

  const hiddenUIRoutes = [
    "/MicroPage",
    "/Prices",
    "/SistemaMicrosip",
    "/FormMicro",
    "/sat",
    "/Experiencia",

    "/Bancos",
    "/Contabilidad",
    "/Nomina",
    "/CeoMovil",
    "/CuentasPagar",
    "/Compras",
    "/Inventarios",
    "/CuentasCobrar",
    "/SyncE",
    "/Ventas",
    "/PuntoVenta",
    "/EnRuta",
    "/AdminSuc",

    "/BmktPage",
    "/Landing",
  ];

  const hideUI = hiddenUIRoutes.includes(location.pathname);

  return (
    <Background hideUI={hideUI}>

      {!hideUI && <Navbar />}

      <Routes>
        <Route path="/" element={
          <>
            <Body />
            {/*<SocialProof />*/}
            <Cards />
            <LargeTestimonial />
            <FAQSection />
            <EquipoPage />
            <CTASection />
          </>
        } />

        <Route path="/form" element={<ContactSection />} />
        <Route path="/FormMicro" element={<FormMicro />} />

        <Route path="/BmktPage" element={<BmktPage />} />
        <Route path="/Landing" element={<Landing />} />

        <Route path="/sat" element={<Sat />} />
        <Route path="/krkn" element={<Krkn />} />
        <Route path="/MicroPage" element={<MicroPage />} />
        <Route path="/Prices" element={<Prices />} />
        <Route path="/SistemaMicrosip" element={<SistemaMicrosip />} />
        <Route path="/Experiencia" element={<Experiencia />} />

        <Route path="/Bancos" element={<Bancos />} />
        <Route path="/Contabilidad" element={<Contabilidad />} />
        <Route path="/Nomina" element={<Nomina />} />
        <Route path="/CeoMovil" element={<CeoMovil />} />
        <Route path="/CuentasPagar" element={<CuentasPagar />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/Inventarios" element={<Inventarios />} />
        <Route path="/CuentasCobrar" element={<CuentasCobrar />} />
        <Route path="/SyncE" element={<SyncE />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/PuntoVenta" element={<PuntoVenta />} />
        <Route path="/EnRuta" element={<EnRuta />} />
        <Route path="/AdminSuc" element={<AdminSuc />} />
      </Routes>

      {!hideUI && <FooterSection />}

    </Background>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

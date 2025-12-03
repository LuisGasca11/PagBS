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

//Microsip
import MicroPage from './components/Microsip/MicroPage';
import SistemaMicrosip from './components/Microsip/SistemaMicrosip';
import Krkn from './components/Krkn/Krkn';
import FormMicro from './components/Microsip/FormMicro';
import BmktPage from './components/BMKT/BmktPage';
import Sat from './components/Microsip/SAT';
import Prices from './components/Microsip/Prices';

//Modules
import EditablePage from './components/Microsip/Moduls/EditablePage';

function AppContent() {
  const location = useLocation();

  const hiddenUIRoutes = [
    "/MicroPage",
    "/Prices",
    "/SistemaMicrosip",
    "/FormMicro",
    "/sat",
    "/EditablePage"
  ];

  const hideUI = hiddenUIRoutes.includes(location.pathname);

  return (
    <Background hideUI={hideUI}>

      {!hideUI && <Navbar />}

      <Routes>
        <Route path="/" element={
          <>
            <Body />
            <SocialProof />
            <Cards />
            <LargeTestimonial />
            <FAQSection />
            <EquipoPage />
            <CTASection />
          </>
        } />

        <Route path="/form" element={<ContactSection />} />
        <Route path="/FormMicro" element={<FormMicro />} />

        <Route path="/sat" element={<Sat />} />
        <Route path="/krkn" element={<Krkn />} />
        <Route path="/bmkt" element={<BmktPage />} />
        <Route path="/MicroPage" element={<MicroPage />} />
        <Route path="/Prices" element={<Prices />} />
        <Route path="/SistemaMicrosip" element={<SistemaMicrosip />} />

        <Route path="/EditablePage" element={<EditablePage />} />
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

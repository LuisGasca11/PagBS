import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Body from './components/Body';
import Cards from './components/Cards/Cards';
import { CTASection } from './components/CTA-Section/cta-section';
import Team from './components/Team/Team';
import Background from './components/Background/Background';
import Form from './components/Form/Form';
import VendedorPanel from './components/Panel/VendedorPanel';
import MicroPage from './components/Microsip/Micropage';
import Krkn from './components/KRKN/KRKN.JSX';
import BmktPage from './components/BMKT/BmktPage';
import { LargeTestimonial } from './components/Testimonials/LargeTestimonial';
import { SocialProof } from './components/Brands/SocialProof';
import { FAQSection } from './components/FAQ/faqdata';
import { FooterSection } from './components/Footer/FooterV0';


function App() {
  return (
    <Router>
      <Background>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Body />
              <SocialProof />
              <Cards />
              <LargeTestimonial />
              {/*<PricingSection />*/}
              {/*<TestimonialGridSection />*/}
              <FAQSection />
              <Team />
              <CTASection />
            </>
          } />
          {/*<Route path="/login" element={<Login />} />*/}
          <Route path="/form" element={<Form />} />
          <Route path="/vendedor" element={<VendedorPanel />} />
          <Route path="/micropage" element={<MicroPage />} />
          <Route path="/bmkt" element={<BmktPage />} />
          <Route path="/krkn" element={<Krkn />} />
        </Routes>
        <FooterSection />
      </Background>
    </Router>
  );
}

export default App;
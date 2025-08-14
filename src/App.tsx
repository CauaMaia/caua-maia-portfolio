import React, { useState } from "react";
import "./App.css";

import Particles from "./components/Particles";
import Hero from "./sections/Hero";
import MyWork from "./sections/MyWork";
import About from "./sections/About";
import Differentials from "./sections/Diferencials";
import Footer from "./sections/Footer";
import LanguageToggle from "components/LanguageToggle";

function App() {
  const [locale, setLocale] = useState<"en" | "pt">("en");

  return (
    <>
       <LanguageToggle value={locale} onChange={setLocale} floating />
      <Particles /> 

      <div className="site-content">
       
        <section id="home"><Hero locale={locale} /></section>
        <section id="work"><MyWork locale={locale} /></section>
        <section id="about"><About locale={locale} /></section>
        <Differentials id="differentials" locale={locale} />
      </div>

      <Footer id="footer" locale={locale} /> 
    </>
  );
}

export default App;

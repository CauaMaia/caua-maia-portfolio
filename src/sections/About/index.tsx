import React from "react";
import "./styles.css";
import { WireframeMedia } from "../../components/WireframeMedia";

type Locale = "en" | "pt";

const COPY: Record<Locale, { title: string; p1: string; p2: string }> = {
  en: {
    title: "About me",
    p1: "I’m Cauã Maia, a UI designer crafting experiences where form meets function. Focused on clean, impactful interfaces, I blend aesthetic precision with intuitive usability — creating designs that look good and work beautifully.",
    p2: "Constantly exploring new ideas, I see design as a bridge between creativity and clarity, where every detail shapes how people connect with technology.",
  },
  pt: {
    title: "Sobre mim",
    p1: "Sou Cauã Maia, um UI designer que cria experiências onde forma encontra função. Focado em interfaces limpas e impactantes, uno precisão estética com usabilidade intuitiva — criando designs bonitos e funcionais.",
    p2: "Sempre explorando novas ideias, vejo o design como uma ponte entre criatividade e clareza, onde cada detalhe molda como as pessoas se conectam com a tecnologia.",
  },
};

interface AboutProps { locale?: Locale; }

const About: React.FC<AboutProps> = ({ locale = "en" }) => {
  const t = COPY[locale];

  return (
    <section className="about">
      <div className="about__wrap">
        <div className="about__text">
          <h2 className="about__title">{t.title}</h2>
          <p className="about__p">{t.p1}</p>
          <p className="about__p">{t.p2}</p>
        </div>

        <WireframeMedia className="about__media" />
      </div>
    </section>
  );
};

export default About;

import React, { useMemo } from "react";
import "./styles.css";
import { DiffCard } from "components/DiffCard";

/* ====== Ícones inline (simples e sem dependências) ====== */
const IconSpark = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M12 3l1.7 3.9L18 8.6l-3.6 2.1L12 15l-2.4-4.3L6 8.6l4.3-1.7L12 3z" fill="currentColor"/>
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
  </svg>
);
const IconGrid = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" fill="currentColor"/>
  </svg>
);
const IconCursor = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M4 3l15 7-6 2 3 7-2 1-3-7-7 3 0-13z" fill="currentColor"/>
  </svg>
);
const IconFeather = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M20.24 4.24a6.5 6.5 0 0 0-9.19 0L4 11.29V20h8.71l7.05-7.05a6.5 6.5 0 0 0 0-9.19ZM7 17l5-5"
      stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.66 6.66L16 16m-8 0-3.66 2.66M16 8l2.66-3.66M8 8 5.34 4.34"
      stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);
const IconFigma = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M9 3h3v6H9a3 3 0 0 1 0-6Zm0 6h3v6H9a3 3 0 0 1 0-6Zm0 6h3v3a3 3 0 1 1-3-3Zm3-12h3a3 3 0 0 1 0 6h-3V3Zm0 6h3a3 3 0 0 1 0 6h-3V9Z" fill="currentColor"/>
  </svg>
);
const IconBraces = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M8 4H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2"
      stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
const IconTerminal = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="m4 7 5 5-5 5M13 17h7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ====== Conteúdo EN/PT ====== */
type Item = { title: string; desc: string; icon: React.ReactElement };

const EN: Item[] = [
  { title: "Minimalist Impact", desc: "Designs that stand out through clarity, not clutter.", icon: <IconSpark/> },
  { title: "User-Centered Thinking", desc: "Every decision is guided by real user needs.", icon: <IconUser/> },
  { title: "Consistent Visual Language", desc: "Cohesive styles that scale across projects.", icon: <IconGrid/> },
  { title: "Interaction-Driven", desc: "Subtle animations and microinteractions that enhance usability.", icon: <IconCursor/> },
  { title: "Adaptive Creativity", desc: "From bold experiments to refined corporate layouts.", icon: <IconFeather/> },
  { title: "Strategic Design Approach", desc: "Balancing aesthetics with measurable results.", icon: <IconTarget/> },
  { title: "Figma Mastery", desc: "Advanced prototyping, component systems, and collaborative workflows.", icon: <IconFigma/> },
  { title: "Tech-Savvy UI", desc: "Knowledge of HTML, CSS, and modern frameworks for seamless designer–developer handoff.", icon: <IconBraces/> },
  { title: "Prototype to Code", desc: "Ability to transform concepts into functional, interactive prototypes.", icon: <IconTerminal/> },
];

const PT: Item[] = [
  { title: "Impacto Minimalista", desc: "Designs que se destacam pela clareza, não pelo excesso.", icon: <IconSpark/> },
  { title: "Pensamento Centrado no Usuário", desc: "Cada decisão é guiada por necessidades reais.", icon: <IconUser/> },
  { title: "Linguagem Visual Consistente", desc: "Estilos coesos que escalam entre projetos.", icon: <IconGrid/> },
  { title: "Foco em Interação", desc: "Animações sutis e microinterações que aprimoram a usabilidade.", icon: <IconCursor/> },
  { title: "Criatividade Adaptativa", desc: "De experimentos ousados a layouts corporativos refinados.", icon: <IconFeather/> },
  { title: "Abordagem de Design Estratégico", desc: "Equilíbrio entre estética e resultados mensuráveis.", icon: <IconTarget/> },
  { title: "Domínio de Figma", desc: "Prototipagem avançada, sistemas de componentes e fluxos colaborativos.", icon: <IconFigma/> },
  { title: "UI Orientada à Tecnologia", desc: "Conhecimento de HTML, CSS e frameworks modernos para um handoff fluido.", icon: <IconBraces/> },
  { title: "Do Protótipo ao Código", desc: "Transformo conceitos em protótipos funcionais e interativos.", icon: <IconTerminal/> },
];

const TITLES = { en: "Differentials", pt: "Diferenciais" };

interface Props { locale?: "en" | "pt"; id?: string; }

const Differentials: React.FC<Props> = ({ locale = "en", id }) => {
  const data = useMemo(() => (locale === "pt" ? PT : EN), [locale]);

  return (
    <section id={id} className="diff-sec">
      <div className="diff-sec__wrap">
        <h2 className="diff-sec__title">{TITLES[locale]}</h2>

        <div className="diff-sec__grid">
          {data.map((it) => (
            <DiffCard key={it.title} title={it.title} desc={it.desc} icon={it.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;

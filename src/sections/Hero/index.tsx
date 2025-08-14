import React from "react";
import "./styles.css";
import { Button } from "../../components/Button";
import { SocialLinks, SocialItem } from "../../components/SocialLinks";

type Locale = "en" | "pt";

const COPY: Record<
  Locale,
  {
    label: string;
    heading: string;
    subtitle: string;
    ctaWork: string;
    ctaAbout: string;
  }
> = {
  en: {
    label: "UI DESIGNER",
    heading: "Hello, my name is",
    subtitle:
      "I craft interfaces that merge aesthetic precision with functional clarity.",
    ctaWork: "My Work",
    ctaAbout: "More About Me",
  },
  pt: {
    label: "UI DESIGNER",
    heading: "Olá, meu nome é",
    subtitle:
      "Crio interfaces que unem precisão estética com clareza funcional.",
    ctaWork: "Meus trabalhos",
    ctaAbout: "Sobre mim",
  },
};

interface HeroProps {
  locale?: Locale;
  name?: string;
  socials?: SocialItem[];
  onClickWork?: () => void;
  onClickAbout?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  locale = "en",
  name = "Cauã Maia",
  socials = [
    { type: "linkedin", href: "https://www.linkedin.com/in/cau%C3%A3-maia/", label: "LinkedIn" },
    { type: "github",   href: "https://github.com/CauaMaia",       label: "GitHub" },
    { type: "figma",    href: "https://www.figma.com/@cauamaiadesouza",     label: "Figma"  },
  ],
  onClickWork,
  onClickAbout,
}) => {
  const t = COPY[locale];

  return (
    <section className="hero" id="home">
      <div className="hero__wrap">
        <div className="hero__label">{t.label}</div>
        <h1 className="hero__heading">{t.heading}</h1>
        <h2 className="hero__name">
          <span className="hero__nameAccent">{name}</span>
        </h2>
        <p className="hero__subtitle">{t.subtitle}</p>
        <div className="hero__actions">
          <Button
            variant="primary"
            onClick={
              onClickWork ??
              (() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" }))
            }
          >
            {t.ctaWork}
          </Button>
          <Button
            variant="secondary"
            onClick={
              onClickAbout ??
              (() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" }))
            }
          >
            {t.ctaAbout}
          </Button>
        </div>
        <div className="hero__socials">
          <SocialLinks items={socials} size="md" variant="outline" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

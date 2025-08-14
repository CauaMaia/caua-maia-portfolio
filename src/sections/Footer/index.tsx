import React from "react";
import "./styles.css";
import { FooterLink } from "../../components/FooterLink";

type Locale = "en" | "pt";
type NavLink = { label: string; href: string; current?: boolean };

interface FooterProps {
  id?: string;
  locale?: Locale;
  nav?: NavLink[]; 
}

const COPY: Record<
  Locale,
  { headline: string; sub: string; nav: NavLink[] }
> = {
  en: {
    headline:
      'Got an <span class="accent">idea</span>? Let’s <span class="accent">make it stunning</span>.',
    sub: "Beautiful, functional, intentional design — from concept to interface.",
    nav: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
    ],
  },
  pt: {
    headline:
      'Tem uma <span class="accent">ideia</span>? Vamos <span class="accent">torná-la incrível</span>.',
    sub: "Design bonito, funcional e intencional — do conceito à interface.",
    nav: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
    ],
  },
};

const Footer: React.FC<FooterProps> = ({ id, locale = "en", nav }) => {
  const c = COPY[locale];
  const links: NavLink[] = nav ?? c.nav; 

  return (
    <footer id={id} className="footer">
      <div className="footer__wrap">
        <h2
          className="footer__headline"
          dangerouslySetInnerHTML={{ __html: c.headline }}
        />
        <p className="footer__subtitle">{c.sub}</p>

        <hr className="footer__rule" />

        <nav className="footer__nav" aria-label="Footer">
          {links.map((l) => (
            <FooterLink
              key={l.href + l.label}
              href={l.href}
              label={l.label}
              current={!!l.current} 
            />
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

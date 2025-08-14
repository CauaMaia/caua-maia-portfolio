import React, { useEffect } from "react";
import "./styles.css";

export type Locale = "en" | "pt";

interface LanguageToggleProps {
  value: Locale;                         // idioma atual
  onChange: (next: Locale) => void;      // callback ao trocar
  className?: string;
  floating?: boolean;                    // deixa fixo no canto inferior direito
  hotkey?: boolean;                      // tecla "L" alterna idioma
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  value,
  onChange,
  className = "",
  floating = false,
  hotkey = true,
}) => {
  // atalho de teclado (L) para alternar
  useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "l") {
        onChange(value === "en" ? "pt" : "en");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey, onChange, value]);

  return (
    <div
      className={`lang-toggle ${floating ? "floating" : ""} ${className}`}
      role="radiogroup"
      aria-label="Language selector"
    >
      <button
        type="button"
        className={`lang-btn ${value === "en" ? "is-active" : ""}`}
        role="radio"
        aria-checked={value === "en"}
        aria-label="Switch to English"
        onClick={() => onChange("en")}
      >
        EN
      </button>

      <button
        type="button"
        className={`lang-btn ${value === "pt" ? "is-active" : ""}`}
        role="radio"
        aria-checked={value === "pt"}
        aria-label="Mudar para Português"
        onClick={() => onChange("pt")}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageToggle;

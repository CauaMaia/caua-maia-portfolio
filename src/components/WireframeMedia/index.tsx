import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

type Mode = "auto" | "desktop" | "mobile";

interface WireframeMediaProps {
  mode?: Mode;          // "auto" alterna por breakpoint
  className?: string;
  observe?: boolean;    // anima ao entrar no viewport (default: true)
  rootMargin?: string;  // margem do observer
}

function useInView<T extends HTMLElement>(enabled = true, rootMargin = "0px 0px -20% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(!enabled);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, rootMargin, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, rootMargin]);

  return { ref, inView };
}

export const WireframeMedia: React.FC<WireframeMediaProps> = ({
  mode = "auto",
  className = "",
  observe = true,
  rootMargin,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>(observe, rootMargin);

  return (
    <div
      ref={ref}
      className={[
        "wfm",
        inView ? "is-visible" : "",
        mode === "desktop" ? "wfm--desktop" : mode === "mobile" ? "wfm--mobile" : "wfm--auto",
        className,
      ].join(" ").trim()}
    >
      {/* DESKTOP/TABLET */}
      <div className="wfm-desk">
        <div className="wfm-frame anm s1" />
        <div className="wfm-inner">
          {/* Topo: linha em bloco + filhos com fade (mantém alinhamento) */}
          <div className="wfm-top anm-row s2">
            <div className="wfm-chip-left fade s3" />
            <div className="wfm-dashes">
              <span className="wfm-dash fade s4" />
              <span className="wfm-dash fade s5" />
              <span className="wfm-dash fade s6" />
            </div>
            <div className="wfm-chip-right fade s7" />
          </div>

          <div className="wfm-body anm s8">
            <div className="wfm-lines">
              <div className="wfm-line xl anm s9" />
              <div className="wfm-line lg anm s10" />
              <div className="wfm-line md anm s11" />
              <div className="wfm-line sm anm s12" />
              <div className="wfm-cta anm s13" />
            </div>
            <div className="wfm-rect anm s14" />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="wfm-mobile">
        <div className="wfm-frame m anm s1" />
        <div className="wfm-inner m">
          <div className="wfm-top m anm-row s2">
            <div className="wfm-chip-left m fade s3" />
            <div className="wfm-hamb fade s4"><span /></div>
          </div>

          <div className="wfm-body m anm s5">
            <div className="wfm-line xl anm s6" />
            <div className="wfm-line lg anm s7" />
            <div className="wfm-line md anm s8" />
            <div className="wfm-cta anm s9" />
            <div className="wfm-rect m anm s10" />
          </div>
        </div>
      </div>
    </div>
  );
};

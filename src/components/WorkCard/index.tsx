import React, { useEffect, useRef } from "react";
import "./styles.css";
import { Tag } from "components/Tag";

interface WorkCardProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  tags?: { label: string; variant?: "yellow" | "dark" }[];
  href?: string;
  className?: string;
}

const MAX_TILT = 10;
const SHADOW = 24;

function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      if (!matchMedia("(pointer:fine)").matches) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = x / r.width - 0.5;
      const py = y / r.height - 0.5;

      const rx = (-py * MAX_TILT).toFixed(2);
      const ry = (px * MAX_TILT).toFixed(2);
      const lx = (x / r.width) * 100;
      const ly = (y / r.height) * 100;
      const sh = (Math.abs(px) + Math.abs(py)) * SHADOW;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
        el.style.setProperty("--lx", `${lx}%`);
        el.style.setProperty("--ly", `${ly}%`);
        el.style.setProperty("--sh", `${sh}px`);
      });
    };

    const onLeave = () => {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
      el.style.setProperty("--sh", `0px`);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = title,
  tags = [],
  href,
  className = "",
}) => {
  const ref = useTilt<HTMLElement>();
  const Wrapper: React.ElementType = href ? "a" : "div";

  return (
    <Wrapper
      ref={ref as any}
      className={`work-card ${className}`}
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="work-card__inner">
        <div className="work-card__image">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} />
          ) : (
            <div className="work-card__placeholder" aria-hidden="true" />
          )}
        </div>

        <div className="work-card__content">
          <h3 className="work-card__title">{title}</h3>
          <p className="work-card__subtitle">{subtitle}</p>
          {tags.length > 0 && (
            <div className="work-card__tags">
              {tags.map((t, i) => (
                <Tag key={`${t.label}-${i}`} label={t.label} variant={t.variant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

import React, { useEffect, useRef } from "react";
import "./styles.css";

export interface DiffCardProps {
  title: string;
  desc: string;
  icon?: React.ReactNode;
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

export const DiffCard: React.FC<DiffCardProps> = ({ title, desc, icon, className = "" }) => {
  const ref = useTilt<HTMLDivElement>();

  return (
    <div className={`diff-card ${className}`} ref={ref} tabIndex={0}>
      <div className="diff-card__inner">
        {icon && <div className="diff-card__icon">{icon}</div>}
        <h3 className="diff-card__title">{title}</h3>
        <p className="diff-card__desc">{desc}</p>
      </div>
    </div>
  );
};

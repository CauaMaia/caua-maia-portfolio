import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  showDots?: boolean;
}

const ChevronLeft: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
    <path
      d="M15.5 4.5L8 12l7.5 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
    <path
      d="M8.5 4.5L16 12l-7.5 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className = "",
  showDots = true,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pages = useMemo(() => {
    const count = React.Children.count(children);
    return Math.max(1, Math.ceil(count / perView));
  }, [children, perView]);

  const goTo = (p: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const clamped = Math.max(0, Math.min(p, pages - 1));
    vp.scrollTo({ left: clamped * vp.clientWidth, behavior: "smooth" });
    setPage(clamped);
  };

  const next = () => goTo(page + 1);
  const prev = () => goTo(page - 1);

  const onScroll = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const newPage = Math.round(vp.scrollLeft / vp.clientWidth);
    if (newPage !== page) setPage(newPage);
  };

  return (
    <div className={`carousel ${className}`}>
      <button className="car-btn car-btn--prev" onClick={prev} aria-label="Previous">
        <ChevronLeft />
      </button>

      <div className="car-viewport" ref={viewportRef} onScroll={onScroll}>
        <div className="car-track">
          {React.Children.map(children, (child, idx) => (
            <div className="car-slide" key={idx}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <button className="car-btn car-btn--next" onClick={next} aria-label="Next">
        <ChevronRight />
      </button>

      {showDots && (
        <div className="car-dots" role="tablist" aria-label="Carousel Pagination">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={page === i}
              className={`car-dot ${page === i ? "is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

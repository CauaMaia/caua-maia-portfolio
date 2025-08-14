import React, { useEffect, useRef } from "react";
import "./styles.css";

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  r: number; a: number;    // alpha base
  hue: number;             // variação de cor
  tw: number;              // fase do "twinkle"
};

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    // viewport / DPR
    let W = 0, H = 0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    // partículas
    let particles: Particle[] = [];

    // mouse
    const mouse = { x: -9999, y: -9999, active: false };

    // configs
    const DENSITY = 0.00008;      // densidade das partículas por área
    const SPEED = 0.25;           // velocidade base
    const RADIUS = 120;           // raio de influência do mouse
    const LINK_RADIUS = 140;      // raio para desenhar linha até o mouse
    const BURST_FORCE = 1.8;      // força do clique

    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(60, Math.min(160, Math.floor(W * H * DENSITY)));
      particles = new Array(count).fill(0).map(() => ({
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-SPEED, SPEED),
        vy: rand(-SPEED * 0.8, SPEED * 0.8),
        r: rand(0.6, 1.8),
        a: rand(0.35, 0.85),
        hue: rand(-10, 10),
        tw: rand(0, Math.PI * 2),
      }));
    }

    function step() {
      ctx.clearRect(0, 0, W, H);

      for (let p of particles) {
        // interatividade — repulsão suave
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R2 = RADIUS * RADIUS;

          if (d2 < R2 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const f = (1 - d / RADIUS) * 0.06; // intensidade
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;

            // linha até o mouse
            const opacity = (1 - d / LINK_RADIUS) * 0.35;
            if (opacity > 0) {
              ctx.strokeStyle = `rgba(138,56,245,${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }

        // movimento + atrito leve
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // wrap nas bordas
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        // brilho/twinkle
        p.tw += 0.02;
        const tw = (Math.sin(p.tw) + 1) * 0.5; // 0..1

        // cor base (roxo + leve branco)
        const accentHue = 265; // #8A38F5
        const hue = accentHue + p.hue;

        ctx.globalAlpha = p.a * (0.6 + 0.4 * tw);
        ctx.fillStyle = `hsl(${hue} 90% 64%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = p.a * 0.35 * (0.6 + 0.4 * tw);
        ctx.fillStyle = "rgba(235,235,235,.9)";
        ctx.beginPath();
        ctx.arc(p.x + p.r * 0.4, p.y - p.r * 0.3, p.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
      mouse.x = mouse.y = -9999;
    }
    function onClick(e: MouseEvent) {
      const mx = e.clientX, my = e.clientY;
      // pulso radial
      for (let p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        const d = Math.sqrt(d2) || 1;
        const f = Math.min(BURST_FORCE / d, 0.08); // força decai com a distância
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouse.x = t.clientX;
        mouse.y = t.clientY;
        mouse.active = true;
      }
    }
    function onTouchEnd() { onLeave(); }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    if (!prefersReduced) raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return <canvas className="particles-canvas" ref={canvasRef} aria-hidden="true" />;
};

export default Particles;

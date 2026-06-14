import { useEffect, useRef } from "react";

export const CursorSparkle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: -200, y: -200 };
    let prevMouse = { x: -200, y: -200 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "255,255,255",
      "242,230,235",
      "207,196,230",
      "246,244,250",
      "249,230,240",
      "224,214,238",
    ];

    class Sparkle {
      constructor(x, y, opts = {}) {
        const spread = opts.spread ?? 10;
        this.x = x + (Math.random() - 0.5) * spread;
        this.y = y + (Math.random() - 0.5) * spread;
        this.size = Math.random() * 1.4 + 1.2;
        this.baseAlpha = Math.random() * 0.3 + 0.7;
        this.alpha = this.baseAlpha;
        const vxBase = opts.vx ?? 0;
        const vyBase = opts.vy ?? 0;
        this.vx = vxBase + (Math.random() - 0.5) * 0.2;
        this.vy = vyBase + (Math.random() - 0.5) * 0.2;
        this.decay = Math.random() * 0.005 + 0.005;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.twinkleSpeed = Math.random() * 0.06 + 0.04;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.baseAlpha -= this.decay;
        this.twinklePhase += this.twinkleSpeed;
        const flicker = 0.85 + Math.sin(this.twinklePhase) * 0.15;
        this.alpha = Math.max(0, this.baseAlpha) * flicker;
      }

      drawStar(ctx, x, y, r) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const long = r * 4.5;
          const short = r * 0.12;
          ctx.lineTo(Math.cos(angle) * long, Math.sin(angle) * long);
          ctx.lineTo(
            Math.cos(angle + Math.PI / 4) * short,
            Math.sin(angle + Math.PI / 4) * short
          );
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.fillStyle = `rgba(${this.color}, 1)`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${this.color}, 0.7)`;
        this.drawStar(ctx, this.x, this.y, this.size);
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      const trailVx = -dx * 0.04;
      const trailVy = -dy * 0.04;
      const count = Math.random() < 0.5 ? 1 : 2;
      for (let i = 0; i < count; i++) {
        particles.push(
          new Sparkle(mouse.x, mouse.y, {
            vx: trailVx,
            vy: trailVy,
            spread: 8,
          })
        );
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.baseAlpha > 0.01);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

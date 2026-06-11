import { useEffect, useRef } from "react";

export const CursorSparkle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: -200, y: -200 };

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

    class Particle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 24;
        this.y = y + (Math.random() - 0.5) * 24;
        this.size = Math.random() * 3.5 + 1;
        this.alpha = Math.random() * 0.6 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6 - 0.3;
        this.decay = Math.random() * 0.006 + 0.004;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.isStar = Math.random() > 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.size *= 0.995;
        this.rotation += 0.05;
      }

      drawStar(ctx, x, y, r) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const long = r * 1.8;
          const short = r * 0.4;
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
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        // 글로우 효과
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        if (this.isStar) {
          this.drawStar(ctx, this.x, this.y, this.size);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const count = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.alpha > 0.01);
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

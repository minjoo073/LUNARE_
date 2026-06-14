import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease = "power3.out";

      // 1. 섹션 헤딩 fade-up
      gsap.utils.toArray(".gsap-heading").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          y: 50, opacity: 0, duration: 1.2, ease,
        });
      });

      // 2. 일반 텍스트 fade-up
      gsap.utils.toArray(".gsap-text").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          y: 30, opacity: 0, duration: 1.1, ease,
        });
      });

      // 3. 이미지 fade-in (단일)
      gsap.utils.toArray(".gsap-img").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          opacity: 0, y: 30, duration: 1.4, ease,
        });
      });

      // 4. 스태거 그룹 (자식 요소들 순서대로)
      gsap.utils.toArray(".gsap-stagger").forEach((container) => {
        const children = Array.from(container.children).filter(el => el.tagName !== "SCRIPT");
        if (children.length === 0) return;
        gsap.from(children, {
          scrollTrigger: { trigger: container, start: "top 85%", toggleActions: "play none none none" },
          y: 30, opacity: 0, duration: 0.9, stagger: 0.15, ease,
        });
      });

      // 5. 슬라이드 좌/우
      gsap.utils.toArray(".gsap-slide-left").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          x: -60, opacity: 0, duration: 1.3, ease,
        });
      });

      gsap.utils.toArray(".gsap-slide-right").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          x: 60, opacity: 0, duration: 1.3, ease,
        });
      });

      // 6. 목업 이미지 scale-up
      gsap.utils.toArray(".gsap-scale").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
          scale: 0.93, opacity: 0, duration: 1.5, ease,
        });
      });

      // 7. Brand Concept 텍스트 — 헤딩 먼저, 본문 순서대로 fade-up
      gsap.utils.toArray(".gsap-brand-text").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
          y: 35, opacity: 0, duration: 1.3, delay: i * 0.22, ease: "power2.out",
        });
      });

      // 모바일 이미지 — clip-path 커튼 오픈 (위→아래로 열림)
      gsap.utils.toArray(".gsap-mobile-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          y: 20,
          duration: 1.6,
          ease: "power3.inOut",
        });
        gsap.set(el, { clipPath: "inset(0 0 0% 0)" });
      });

      // 7a. 섹션 라벨 순수 fade-in (Main Page, Shop Page, Login 등)
      gsap.utils.toArray(".gsap-fade").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          opacity: 0, duration: 1.2, ease: "power2.out",
        });
      });

      // 7b. Brand Concept 구분선 scaleY fade-in
      gsap.utils.toArray(".gsap-brand-divider").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
          scaleY: 0, opacity: 0, duration: 1.0, delay: 0.4, transformOrigin: "top center", ease: "power2.inOut",
        });
      });

      // 8. 와이어프레임 텍스트 항목별 개별 등장
      gsap.utils.toArray(".gsap-wire-item").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          y: 25, opacity: 0, duration: 0.9, ease,
        });
      });

      // 9. 히어로 텍스트 초기 애니메이션 (페이지 로드 시)
      gsap.from(".gsap-hero-title", {
        y: 60, opacity: 0, duration: 1.5, delay: 0.3, ease: "power4.out",
      });

      gsap.from(".gsap-hero-meta", {
        y: 25, opacity: 0, duration: 1.1, delay: 0.8, stagger: 0.15, ease,
      });

      // 10. Process Step 카드 — 개별 fade-up (한꺼번에 들어오지 않도록)
      gsap.utils.toArray(".gsap-process-step").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          y: 40, opacity: 0, duration: 1.0, ease,
        });
      });

      // 11. Process 컨셉 이미지 미세 패럴럭스 (정적 이미지에 깊이감)
      const processStepsContainer = document.querySelector(".process-steps");
      const processImageBase = document.querySelector(".process-image-base");
      if (processImageBase && processStepsContainer) {
        gsap.fromTo(
          processImageBase,
          { yPercent: 3 },
          {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: processStepsContainer,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // 13. Active Step 강조 — 현재 보는 Step의 번호·제목 컬러 시프트
      gsap.utils.toArray(".gsap-process-step").forEach((stepEl) => {
        const numEl = stepEl.querySelector(".gsap-process-num");
        const titleEl = stepEl.querySelector(".gsap-process-title");
        if (!numEl || !titleEl) return;
        gsap.set(titleEl, { transformOrigin: "left center" });
        const activate = () => {
          gsap.to(numEl, { color: "#7e5a68", duration: 0.45, ease: "power2.out" });
          gsap.to(titleEl, { color: "#7e5a68", scale: 1.08, duration: 0.5, ease: "power2.out" });
        };
        const deactivate = () => {
          gsap.to(numEl, { color: "#aaaaaa", duration: 0.45, ease: "power2.out" });
          gsap.to(titleEl, { color: "#1a1a1a", scale: 1, duration: 0.5, ease: "power2.out" });
        };
        ScrollTrigger.create({
          trigger: stepEl,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: activate,
          onEnterBack: activate,
          onLeave: deactivate,
          onLeaveBack: deactivate,
        });
      });
    });

    return () => ctx.revert();
  }, []);
}

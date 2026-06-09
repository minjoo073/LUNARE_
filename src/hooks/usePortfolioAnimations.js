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

      // 8. 히어로 텍스트 초기 애니메이션 (페이지 로드 시)
      gsap.from(".gsap-hero-title", {
        y: 60, opacity: 0, duration: 1.5, delay: 0.3, ease: "power4.out",
      });

      gsap.from(".gsap-hero-meta", {
        y: 25, opacity: 0, duration: 1.1, delay: 0.8, stagger: 0.15, ease,
      });
    });

    return () => ctx.revert();
  }, []);
}

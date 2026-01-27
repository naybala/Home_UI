import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import { NavLinksProps } from "../../types/MobileNavProps";

export const NavLinks = ({ className = "", onClick }: NavLinksProps) => {
  const { t } = useTranslation("common");
  const [active, setActive] = useState<string>("home");

  const sections = ["home", "tutorial", "our-info", "app-ui"];
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScrollTo = (sectionId: string, offset = -100) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + offset;

      isScrolling.current = true;
      setActive(sectionId);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 700);

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px 0px 0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getButtonClass = (section: string) => {
    return `${className} ${active === section ? "active" : ""}`;
  };

  return (
    <>
      {sections?.map((section: any) => (
        <button
          className={getButtonClass(section)}
          onClick={() => {
            handleScrollTo(section);
            onClick?.();
          }}
          key={section}
        >
          {t(section)}
        </button>
      ))}
    </>
  );
};

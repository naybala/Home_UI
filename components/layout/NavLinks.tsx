"use client";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import { NavLinksProps } from "../../types/MobileNavProps";
import { useRouter } from "next/router";

export const NavLinks = ({ className = "", onClick }: NavLinksProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [active, setActive] = useState<string>("home");

  const scrollSections = ["home", "tutorial", "our-info", "app-ui"];
  const pageLinks = ["about", "products"];
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScrollTo = (sectionId: string, offset = -100) => {
    if (router.pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

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

  const handlePageNav = (page: string) => {
    router.push(`/${page}`);
    setActive(page);
  };

  useEffect(() => {
    // pageLinks.forEach((element) => {
    //   if (router.pathname === element) {
    //     setActive(element);
    //   }
    // });

    if (router.pathname === "/about") {
      setActive("about");
      return;
    }

    if (router.pathname === "/products") {
      setActive("products");
      return;
    }

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

    scrollSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [router.pathname]);

  const getButtonClass = (item: string) => {
    return `${className} ${active === item ? "active" : ""}`;
  };

  return (
    <>
      {scrollSections.map((section) => (
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
      {pageLinks.map((page) => (
        <button
          className={getButtonClass(page)}
          onClick={() => {
            handlePageNav(page);
            onClick?.();
          }}
          key={page}
        >
          {t(page)}
        </button>
      ))}
    </>
  );
};

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavLinksProps } from "../../types/MobileNavProps";
import { useRouter, usePathname } from "next/navigation";

export const NavLinks = ({
  className = "",
  onClick,
  t,
}: NavLinksProps & { t: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<string>("home");

  const scrollSections = ["home", "about-us", "our-services"];
  const pageLinks = [
    { id: "properties", href: "/properties" },
    { id: "products", href: "/products" },
  ];
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScrollTo = (sectionId: string, offset = -100) => {
    const segments = pathname.split("/");
    const locale = segments[1] || "en";

    if (pathname !== `/${locale}` && pathname !== `/${locale}/`) {
      router.push(`/${locale}/#${sectionId}`);
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

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -75% 0px",
      threshold: 0,
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
  }, [pathname]);

  const getButtonClass = (item: string) => {
    return `${className} nav-link-item ${active === item ? "active" : ""}`;
  };

  const segments = pathname.split("/");
  const locale = segments[1] || "en";

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
          {t[section]}
        </button>
      ))}
      {pageLinks.map((page) => (
        <Link
          href={`/${locale}${page.href}`}
          className={getButtonClass(page.id)}
          onClick={() => {
            setActive(page.id);
            onClick?.();
          }}
          key={page.id}
          prefetch={true}
        >
          {t[page.id]}
        </Link>
      ))}
    </>
  );
};

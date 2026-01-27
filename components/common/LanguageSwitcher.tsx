import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { LanguageSwitcherProps } from "../../types/MobileNavProps";

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale, pathname, query, asPath } = router;

  return (
    <>
      {locale === "mm" ? (
        <Link href={{ pathname, query }} as={asPath} locale="en">
          <button className={className}>
            <img
              className="w-7 rounded-sm shadow-lg"
              src="/images/Flag_of_the_United_States.svg.webp"
              alt="english flag"
            />
          </button>
        </Link>
      ) : (
        <Link href={{ pathname, query }} as={asPath} locale="mm">
          <button className={className} disabled={locale === "mm"}>
            <img
              className="w-7 rounded-sm shadow-lg"
              src="/images/Flag_of_Myanmar.svg.png"
              alt="myanmar flag"
            />
          </button>
        </Link>
      )}
    </>
  );
};

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/components/common/ThemeToggle.css";
import { Seo } from "@/components/Seo";
import Providers from "@/components/providers/Providers";

import RootLayout from "@/components/layout/RootLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global SEO fallback */}
      <Seo favicon="/images/lucky_click.png" />
      <Providers>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </Providers>
    </>
  );
}

export default appWithTranslation(MyApp);

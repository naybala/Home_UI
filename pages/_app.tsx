import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Seo } from "@/components/Seo";

import RootLayout from "@/components/layout/RootLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      {/* Global SEO fallback */}
      <Seo favicon="/images/lucky_click.png" />
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(MyApp);

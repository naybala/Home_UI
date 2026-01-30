"use client";

import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useRef } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <PrimeReactProvider>
        {children}

        {/*  Always render – no structure change */}
        <Toast
          ref={(el) => {
            if (el) {
              (window as any).toast = el;
            }
          }}
        />
        <ConfirmDialog />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

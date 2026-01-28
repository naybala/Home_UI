"use client";

import React, { useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        {children}
        <Toast
          ref={(el) => {
            if (typeof window !== "undefined") {
              (window as any).toast = el;
            }
          }}
        />
        <ConfirmDialog />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

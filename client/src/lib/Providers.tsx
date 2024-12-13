"use client";

import { store } from "@/Redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </NextUIProvider>
  );
}

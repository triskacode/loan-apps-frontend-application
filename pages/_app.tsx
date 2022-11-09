import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import NextProgress from "nextjs-progressbar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NextProgress
          color="linear-gradient(to right, #ec4899, #8b5cf6)"
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
        <ToastContainer />
      </Hydrate>
    </QueryClientProvider>
  );
}


'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function QueryWrapper({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient(
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 1000 * 60 * 5, // 5 minutes
        },
      },
    }
  ));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

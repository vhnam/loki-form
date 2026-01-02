import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export interface RouterContext {
  queryClient: QueryClient;
}

export interface QueryClientProviderProps extends PropsWithChildren {
  queryClient: QueryClient;
}

export function getContext() {
  const queryClient = new QueryClient();
  return {
    queryClient,
  };
}

export function Provider({ children, queryClient }: QueryClientProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

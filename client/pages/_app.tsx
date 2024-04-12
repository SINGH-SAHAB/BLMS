// import type { AppProps } from 'next/app'
// import { QueryClient, QueryClientProvider } from 'react-query';
// const queryClient = new QueryClient();

 
// export default function MyApp({ Component, pageProps }: AppProps) {
//   // return <Component {...pageProps} />
//       return <QueryClientProvider client={queryClient}>
//       <Component {...pageProps} />
//     </QueryClientProvider>
// }

// _app.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { AppProps } from 'next/app';
import { api } from '../redux/features/layout/api';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;

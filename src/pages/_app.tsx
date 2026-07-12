import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { UserProvider, useUser } from '../contexts/UserContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import Signup from '../components/Signup';
import '../styles/global.css';

function AppContent({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!user) return <Signup />;

  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent Component={Component} pageProps={pageProps} />
        <Analytics />
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;

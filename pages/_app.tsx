import { IBM_Plex_Sans } from 'next/font/google';
import app from '@/lib/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import colors from 'tailwindcss/colors';
import type { AppPropsWithLayout } from 'types';
import mixpanel from 'mixpanel-browser';

import '@boxyhq/react-ui/dist/react-ui.css';
import '../styles/globals.css';
import { useEffect } from 'react';
import env from '@/lib/env';
import { Theme, applyTheme } from '@/lib/theme';
import { Themer } from '@boxyhq/react-ui/shared';
import { AccountLayout } from '@/components/layouts';

const brandFont = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { session, ...props } = pageProps;

  // Add mixpanel
  useEffect(() => {
    if (env.mixpanel.token) {
      mixpanel.init(env.mixpanel.token, {
        debug: true,
        ignore_dnt: true,
        track_pageview: true,
      });
    }

    if (env.darkModeEnabled) {
      applyTheme(localStorage.getItem('theme') as Theme);
    }
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <AccountLayout>{page}</AccountLayout>);

  return (
    <>
      <style jsx global>{`body { font-family: ${brandFont.style.fontFamily}; }`}</style>
      <Head>
        <title>{app.name}</title>
        <link rel="icon" href="/brand-mark.svg" />
      </Head>
      <SessionProvider session={session}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Themer
          overrideTheme={{
            '--primary-color': colors.indigo['500'],
            '--primary-hover': colors.indigo['600'],
            '--primary-color-50': colors.indigo['50'],
            '--primary-color-100': colors.indigo['100'],
            '--primary-color-200': colors.indigo['200'],
            '--primary-color-300': colors.indigo['300'],
            '--primary-color-500': colors.indigo['500'],
            '--primary-color-600': colors.indigo['600'],
            '--primary-color-700': colors.indigo['700'],
            '--primary-color-800': colors.indigo['800'],
            '--primary-color-900': colors.indigo['900'],
            '--primary-color-950': colors.indigo['950'],
          }}
        >
          {getLayout(<Component {...props} />)}
        </Themer>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation<never>(MyApp);

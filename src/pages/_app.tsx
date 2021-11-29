import App from 'next/app'
import Head from "next/head";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import { createContext } from "react";

// Strapi
import { getStrapiMedia } from "../lib/strapi/media";

// Clientside Firebase API
// TODO - upgrade to v9
import firebase from "firebase/app";
import "firebase/analytics";

// Sentry
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { fetchAPI } from "../lib/strapi/api";

if (typeof window != "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyCvSaupfnCLqdPrJ0JScChIqlYsqS2faOk",
      authDomain: "osca-302602.firebaseapp.com",
      projectId: "osca-302602",
      storageBucket: "osca-302602.appspot.com",
      messagingSenderId: "914816009770",
      appId: "1:914816009770:web:d1d9b03267db2ba0e6e553",
      measurementId: "G-1D6T2PVMXE",
    });
  }
  firebase.analytics();
}

// Sentry API

Sentry.init({
  dsn: "https://e171613922b24f25a91ce5a0642457ea@o514246.ingest.sentry.io/5617274",
  integrations: [new Integrations.BrowserTracing()],
  beforeSend(event) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        user: event.user,
        subtitle: `The osca.coop team has been notified!`,
        subtitle2: `If you’d like to help, please tell us what happened below. You can also reach us at osca.coop@gmail.com.`,
      });
    }
    return event;
  },

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0, // represents the percentage chance that any given transaction will be sent to Sentry
});
typeof window != "undefined" &&
  Sentry.setTags({ hostname: window.location.hostname });

// Strapi Global object in context
export const GlobalContext = createContext({});

const _App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const { global } = pageProps;    
  const { metadata } = global;

  return (
    <>
      <Head>
        <title>{metadata?.metaTitle}</title>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={metadata?.metaDescription}
        />
      </Head>

      <SessionProvider session={session}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider options={{ useSystemColorMode: true }}>
            <GlobalContext.Provider value={global}>
              <Component {...pageProps} />
            </GlobalContext.Provider>
          </ColorModeProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
_App.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/global");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default _App;

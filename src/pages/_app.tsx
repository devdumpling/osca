import Head from "next/head";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";

// Clientside Firebase API
// TODO - upgrade to v9
import firebase from "firebase/app";
import "firebase/analytics";

// Sentry
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

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

const _App = ({ Component, pageProps: { session, ...pageProps } }) => {  
  return (
    <>
      <Head>
        <title>OSCA</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" />
      </Head>

      <SessionProvider session={session}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider options={{ useSystemColorMode: true }}>
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default _App;

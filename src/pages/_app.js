import App from 'next/app'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
  GithubClient,
  TinacmsGithubProvider,
  GithubMediaStore
} from 'react-tinacms-github'
import theme from '../theme'
import { motion } from 'framer-motion'

// Clientside Firebase API
import firebase from 'firebase/app'
import 'firebase/analytics'

if (typeof window != 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyCvSaupfnCLqdPrJ0JScChIqlYsqS2faOk",
      authDomain: "osca-302602.firebaseapp.com",
      projectId: "osca-302602",
      storageBucket: "osca-302602.appspot.com",
      messagingSenderId: "914816009770",
      appId: "1:914816009770:web:d1d9b03267db2ba0e6e553",
      measurementId: "G-1D6T2PVMXE"
    })
  }
  firebase.analytics()
}

// Sentry API
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
Sentry.init({
  dsn: "https://e171613922b24f25a91ce5a0642457ea@o514246.ingest.sentry.io/5617274",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ 
        eventId: event.event_id, 
        user: event.user,
        subtitle: `The osca.coop team has been notified!`,
        subtitle2: `If you’d like to help, please tell us what happened below. You can also reach us at osca.coop@gmail.com.`
      })
    }
    return event
  },

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0, // represents the percentage chance that any given transaction will be sent to Sentry
})
typeof window != 'undefined' && Sentry.setTags({ hostname: window.location.hostname })

export default class Site extends App {
  constructor(props) {
    super(props)

    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.NEXT_PUBLIC_REPO_FULL_NAME,
      baseBranch: process.env.NEXT_PUBLIC_BASE_BRANCH
    })

    const cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        github
      },
      media: new GithubMediaStore(github),
      sidebar: false,
      toolbar: props.pageProps.preview
    })
    this.cms = cms

    import('react-tinacms-editor').then(
      ({ MarkdownFieldPlugin, HtmlFieldPlugin }) => {
        cms.plugins.add(MarkdownFieldPlugin)
        cms.plugins.add(HtmlFieldPlugin)
      }
    )
  }

  render() {
    const { Component, pageProps, router } = this.props    

    return (
      /**
       * 5. Wrap the page Component with the Tina and Github providers
       */
      <TinaProvider cms={this.cms}>
        <Provider session={pageProps.session}>
          <ChakraProvider resetCSS theme={theme}>
            <ColorModeProvider options={{useSystemColorMode: true}}>
              <TinacmsGithubProvider
                onLogin={onLogin}
                onLogout={onLogout}
                error={pageProps.error}
              >
                <motion.div key={router.route} initial="pageInit" animate="pageAnim" variants={{
                  pageInit: {
                    opacity: 1 // had to reset this because it was causing dark mode to freak out
                  },
                  pageAnim: {
                    opacity: 1
                  },
                }}>
                  <Component {...pageProps} cms={this.cms} />
                </motion.div>
              </TinacmsGithubProvider>
            </ColorModeProvider>
          </ChakraProvider>
        </Provider>
      </TinaProvider>
    )
  }
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch('/api/preview', { headers: headers })
  const data = await resp.json()

  if (resp.status === 200) {
    window.location.href = window.location.pathname
  } else throw new Error(data.message)
}

const onLogout = () => {
  return fetch('/api/reset-preview').then(() => {
    window.location.reload()
  })
}

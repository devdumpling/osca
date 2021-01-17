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

export default class Site extends App {
  constructor (props) {
    super(props)

    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.NEXT_PUBLIC_REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      baseBranch: process.env.NEXT_PUBLIC_BASE_BRANCH // e.g. 'master' or 'main' on newer repos
    })

    /**
     * 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github
      },
      /**
       * 3. Register the Media Store
       */
      media: new GithubMediaStore(github),
      /**
       * 4. Use the Sidebar and Toolbar
       */
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview
    })
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      /**
       * 5. Wrap the page Component with the Tina and Github providers
       */
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >
          {/**
           * 6. Add a button for entering Preview/Edit Mode
           */}
          <EditLink cms={this.cms} />
          <Provider session={pageProps.session}>
            <ChakraProvider resetCSS theme={theme}>
              <ColorModeProvider
                options={{
                  useSystemColorMode: true
                }}
              >
                <Component {...pageProps} />
              </ColorModeProvider>
            </ChakraProvider>
          </Provider>
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  console.log('token', token)
  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch('/api/preview', { headers: headers })
  const data = await resp.json()

  if (resp.status == 200) {
    // window.location.href = window.location.pathname
    console.log('onLogin: 200 window.location.href = window.location.pathname')
  } else throw new Error(data.message)
}

const onLogout = () => {
  return fetch('/api/reset-preview').then(() => {
    console.log('onLogout: reset preview')
    // window.location.reload()
  })
}

export const EditLink = ({ cms }) => {
  if (typeof window !== 'undefined') {
    window.cms = cms
  }
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}

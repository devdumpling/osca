import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Auth0Provider } from "@auth0/auth0-react";

import theme from '../theme'

const isBrowser = () => typeof window !== "undefined"

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={isBrowser() ? window.location.origin : ''}
    >
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Auth0Provider>
  )
}

export default MyApp

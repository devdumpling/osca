import { Link as ChakraLink, Button } from '@chakra-ui/react'
import { useState } from 'react'

import { Container } from './Container'

<<<<<<< HEAD
export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={2}
  >
    <ChakraLink isExternal href="https://paypal.com" flexGrow={1} mx={2}>      
      <Button width="100%" variant="outline" variantcolor="green">
        Donate
      </Button>
    </ChakraLink>
=======
export const CTA = ({ cms, session }) => {
  const [permissions, setPermissions] = useState()
>>>>>>> 525f20915dd25660862d360fb3fc19974cd3ffb2

  if (typeof (window) !== 'undefined' && !permissions) {
    hit('/api/me').then(setPermissions)
  }

  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom="0"
      width="100%"
      maxWidth="48rem"
      py={2}
    >
      {
        permissions && permissions.tina && 
          <ChakraLink onClick={() => cms.toggle()} flexGrow={1} mx={2}>
            <Button width="100%" variant="outline" variantcolor="green">
              {cms.enabled ? 'Stop Editing' : 'Edit Site'}
            </Button>
          </ChakraLink>
      }
      <ChakraLink isExternal href="https://paypal.com" flexGrow={1} mx={2}>
        <Button width="100%" variant="outline" variantcolor="green">
          Donate
        </Button>
      </ChakraLink>

      <ChakraLink
        isExternal
        href="http://osca.csr.oberlin.edu/osca-foundation"
        flexGrow={3}
        mx={2}
      >
        <Button width="100%" variant="solid" variantcolor="green">
          OSCA Foundation
        </Button>
      </ChakraLink>
    </Container>
)
}

async function hit (...args) {
  return fetch(...args).then(x => x.json())
}

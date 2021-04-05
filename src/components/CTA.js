import { Link as ChakraLink, Button } from '@chakra-ui/react'
import { useState } from 'react'

import { Container } from './Container'

export const CTA = ({ cms, session }) => {
  const [permissions, setPermissions] = useState()

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
      <ChakraLink isExternal href="https://quickclick.com/r/xlehj" flexGrow={1} mx={2}>
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

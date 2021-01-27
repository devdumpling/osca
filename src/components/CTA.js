import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'

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

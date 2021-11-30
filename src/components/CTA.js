import { Link as ChakraLink, Button } from "@chakra-ui/react";
import { useState } from "react";

import { Container } from "./Container";

export const CTA = () => {
  return (
    <Container
      alignSelf="center"
      flexDirection="row"
      width="100%"
      maxWidth="48rem"
      py={2}
    >
      <ChakraLink
        isExternal
        href="https://quickclick.com/r/i0zyb"
        flexGrow={1}
        mx={2}
      >
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
  );
};

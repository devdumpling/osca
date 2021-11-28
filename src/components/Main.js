import { Stack } from "@chakra-ui/react";

export const Main = (props) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    minHeight="calc(100vh - 5rem)"
    pt="1rem"
    px="1rem"
    {...props}
  />
);

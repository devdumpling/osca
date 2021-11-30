import { Stack } from "@chakra-ui/react";

export const Main = (props) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    minHeight="calc(100vh - 5rem)"
    maxWidth="64rem"
    pt="1rem"
    px="1rem"
    {...props}
  />
);

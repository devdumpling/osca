import { Spinner, Heading, Stack } from "@chakra-ui/react";

export const Loader = ({ props }) => (
  <Stack align="center" spacing={8} m={2} {...props}>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal.500"
      size="xl"
    />
    <Heading color="gray.500" fontWeight="thin">
      ...waiting for quorum...
    </Heading>
  </Stack>
);

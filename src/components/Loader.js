import { Spinner, Heading, Stack } from "@chakra-ui/react"

export const Loader = ({ props }) => {
  <Stack spacing={4} {...props}>
    <Heading>
      Waiting for quorum...
    </Heading>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal.500"
      size="xl"
    />
  </Stack>
}

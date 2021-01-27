import { Heading, Text, Flex } from '@chakra-ui/react'

const WIP = () => {
  return (
    <Flex textAlign="left" direction="column" justifyContent="center" alignItems="center" height="100vh">
      <Heading
        bgGradient="linear(to-l, teal.500, green.500)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="bold"
        fontSize="6xl"
        mx={16}
      >
        Oops!
      </Heading>
      <Heading m={4} fontSize="xl">
        Looks like this page is still on stack.
      </Heading>
      <Text fontSize="lg">
        Check back later.
        </Text>
    </Flex>
  )
}

export default WIP
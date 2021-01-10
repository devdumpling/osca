import { Fade, Button, Flex, Text, Heading } from '@chakra-ui/react'

export const Hero = ({ title }) => (
  <Flex direction="column" justifyContent="center" alignItems="center" height="100vh">
    <Heading
      bgGradient="linear(to-l, teal.500, green.500)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="bold"
      fontSize="10vw">{title}</Heading>
    <Fade in={true}>
      <Text py={2} fontSize="xl" textAlign="center">
        new website | new lottery | still OSCA
      </Text>
      <Text fontSize="md" pb={8} color="gray.500" textAlign="center">
        ...coming soon
      </Text>
    </Fade>
    <Button colorScheme="teal" mt={8} variant="outline">
      Get email updates
    </Button>
  </Flex>
)

Hero.defaultProps = {
  title: 'OSCA',
}

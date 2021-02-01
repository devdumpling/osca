import { Fade, Button, Flex, Text, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Hero = ({ title }) => (
  <Flex direction="column" justifyContent="center" alignItems="center" height="calc(100vh - 5rem)">
    <Heading
      bgGradient="linear(to-l, teal.500, green.500)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="bold"
      fontSize="10vw">{title}</Heading>
    <Fade in={true}>
      <Text fontWeight="thin" py={2} fontSize="xl" textAlign="center">
        new website | still OSCA
      </Text>
    </Fade>
    <Button colorScheme="teal" mt={8} variant="outline">
      <Link as={NextLink} href="/lottery">Spring 2021 Lottery</Link>
    </Button>
  </Flex>
)

Hero.defaultProps = {
  title: 'OSCA',
}

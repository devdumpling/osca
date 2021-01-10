import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }) => (  
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading
      bgGradient="linear(to-l, teal.500, green.500)"      
      bgClip="text"
      fontSize="6xl"
      fontWeight="bold"
      fontSize="10vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'OSCA',
}

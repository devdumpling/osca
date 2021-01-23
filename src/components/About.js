import {
  Heading,
  Flex,
  Text,
  Divider,
  VStack
} from '@chakra-ui/react'

import { Container } from './Container'

export const About = () => (
  <Container mb="8rem" textAlign="left">
    <Flex wrap="wrap">
      <VStack spacing={8} mx={4}>
        <Heading mb={2}>
          What is dev.osca.coop?          
        </Heading>
        <Text fontSize="lg">
          With a new year and a new rent contract, OSCA has had to make some major changes.
          In order to adapt to the times, the current OSCA officers, staff, and some members of the OSCA alumni community
          put our minds together to build a new website from the ground up.
        </Text>
        <Text fontSize="lg">
          The new website is <em>currently under construction</em>,
          but we encourage you to check back early February for more information.
        </Text>        
        <Text fontSize="lg">
          We also plan to run the lottery entirely from this website. More details will be available
          closer to February 1, 2021.
        </Text>
      </VStack>
    </Flex>
  </Container>
)
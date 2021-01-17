import {
  Heading,
  Flex,
  Text,
  Divider,
  VStack
} from '@chakra-ui/react'

import { Container } from './Container'

const About = ({ data={} }) => (
  <Container mb='8rem' textAlign='left'>
    <Flex wrap='wrap'>
      <VStack spacing={8} mx={4}>
        <Heading mb={2}>
          {data.title || ''}
        </Heading>
        {(data.body || '').split('\n\n').map((__html, key) => (
          <Text key={key} fontSize='lg' dangerouslySetInnerHTML={{ __html }} />
        ))}
      </VStack>
    </Flex>
  </Container>
)

export default About

import {
  Link as ChakraLink,
  List,
  ListIcon,
  ListItem,
  Text,
  Fade,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { Container } from './Container'

export const About = () => (
  <Fade in={true}>
    <Container textAlign="left">
      <Text py={2} fontSize="xl" textAlign="center">
        new website | new lottery | still OSCA
      </Text>
      <Text fontSize="md" pb={8} color="gray.500" textAlign="center">
        ...coming soon
      </Text>
      <List spacing={3} pl={16} my={0} mt={0}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://www.oberlin.edu/alumni-association/groups/oscalums"
            flexGrow={1}
            mr={2}
          >
            oscalums <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://www.facebook.com/Oberlin-Student-Cooperative-Association-218110806562/" flexGrow={1} mr={2}>
            check fb for updates <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="http://osca.csr.oberlin.edu/" flexGrow={2} mr={2}>
            old website <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Container>
  </Fade >
)
import Meta from '../components/Meta'
import { Heading, Text, Flex } from '@chakra-ui/react'
import { Container } from '../components/Container'
import Header from '../components/Header'

const Alumni = () => {
  return (
    <>
      <Meta title={"OSCA | Alumni"} />
      <Header />
      <Container>
        <Flex textAlign="center" direction="column" justifyContent="center" alignItems="center" height="100vh">
          <Heading mx={16}>
            Oops, looks like this page is still on stack.
          </Heading>
          <Text py={4} fontSize="lg">
            Try back later!
        </Text>
        </Flex>
      </Container>
    </>
  )
}

export default Alumni

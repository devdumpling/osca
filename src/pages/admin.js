import Meta from '../components/Meta'
import { Container } from '../components/Container'
import { Flex, Stack, Text, Divider } from '@chakra-ui/react'
import Header from '../components/Header'

const entries = hit('/api/lottery/entries').
  then(res => {
    if (res.status !== 200) return res.status

    res.json().then(data => console.log(data))
  })
  .catch(err => console.log(err));

console.log(entries);

const Admin = () => {
  return (
    <>
      <Meta title={"OSCAdmin"} />
      <Header />
      <Flex>
        <Stack bgColor="gray.100" w="20vw" direction="column" py={8} px={4}>
          <Text textAlign="center">OSCAdmin</Text>
          <Divider />
        </Stack>
        <Container w="80vw" minHeight="100vh">
          <pre></pre>
        </Container>
      </Flex>
    </>
  )
}

async function hit(...args) {
  return fetch(...args).then(x => x.json())
}

export default Admin
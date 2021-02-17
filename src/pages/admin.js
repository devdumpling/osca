import Meta from '../components/Meta'
import { Container } from '../components/Container'
import { Flex, Stack, Text, Divider } from '@chakra-ui/react'
import Header from '../components/Header'
import { useState } from 'react'
import { useSession } from 'next-auth/client'

const Admin = (props) => {
  let [session, loading] = useSession();
  const [entries, setEntries] = useState([]);

  if (session && session.user) {
    if (!entries.length) {
      loading = true
      hit('/api/lottery/entries')
        .then(data => {
          console.log(data)
          if (data.length) setEntries(data)
          console.log(entries)
        })
        .catch(err => console.log(err));
    } else {
      loading = false
    }
  }

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
import Meta from '../components/Meta'
import { Container } from '../components/Container'
import { Flex, Stack, Text, Divider } from '@chakra-ui/react'
import Header from '../components/Header'
import { useState } from 'react'
import { useSession } from 'next-auth/client'

/* const entries = hit('/api/lottery/entries').
  then(res => {
    if (res.status !== 200) return res.status

    res.json().then(data => console.log(data))
  })
  .catch(err => console.log(err));

console.log(entries); */

const Admin = (props) => {
  let [session, loading] = useSession();
  const [entries, setEntries] = useState([]);

  if (session && session.user) {
    if (!entries.length) {
      loading = true
      hit('https://osca.coop/api/lottery/entries')
        .then(data => {
          if (data.length) setEntries(data[0]);
        })
        .catch(err => console.log(err));

      console.log(entries);
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
          <pre>{entries}</pre>
        </Container>
      </Flex>
    </>
  )
}

async function hit(...args) {
  return fetch(...args).then(x => x.json())
}

export default Admin
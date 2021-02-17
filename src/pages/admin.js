import Meta from '../components/Meta'
import { Container } from '../components/Container'
import { Flex, Stack, Text, Divider, Button } from '@chakra-ui/react'
import Header from '../components/Header'
import { useState } from 'react'
import { useSession } from 'next-auth/client'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

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
      <Flex direction="column">
        <Container direction="column" minWidth="100vw" minHeight="100vh">
          <Stack align="center" direction="row" spacing={4} py={4} px={4}>
            <Text textAlign="center">OSCAdmin</Text>
            <Button>Download</Button>
          </Stack>
          <Table size="sm" variant="simple">
            <TableCaption textAlign="left" placement="top">Showing {entries.length} lottery entries</TableCaption>
            <Thead>
              <Tr>
                <Th>Email</Th>
                <Th>Timestamp</Th>
                <Th>EntryId</Th>
                <Th>First</Th>
                <Th>Last</Th>
                <Th>OCMR</Th>
                <Th>T-Number</Th>
                <Th>Rank 1</Th>
                <Th>Rank 2</Th>
                <Th>Rank 3</Th>
                <Th>Rank 4</Th>
                <Th>Rank 5</Th>
                <Th>Rank 6</Th>
                <Th>Rank 7</Th>
                <Th>Rank 8</Th>
                <Th>Rank 9</Th>
                <Th>Rank 10</Th>
                <Th>Rank 11</Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.map(entry => (
                <Tr key={entry.entryId}>
                  <Td>{entry.email}</Td>
                  <Td>{entry.timestamp}</Td>
                  <Td>{entry.entryId}</Td>
                  <Td>{entry.entryMetadata.firstName}</Td>
                  <Td>{entry.entryMetadata.lastName}</Td>
                  <Td>{entry.entryMetadata.OCMR}</Td>
                  <Td>{entry.entryMetadata.tNumber}</Td>
                  <Td>{entry.entryMetadata.preferences[0] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[1] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[2] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[3] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[4] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[5] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[6] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[7] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[8] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[9] || ''}</Td>
                  <Td>{entry.entryMetadata.preferences[10] || ''}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      </Flex>
    </>
  )
}

async function hit(...args) {
  return fetch(...args).then(x => x.json())
}

export default Admin
import { useState } from 'react'
import { useSession } from 'next-auth/client'
import Meta from '../components/Meta'
import { Box, Divider, Text, Stack, Center, Heading, OrderedList, ListItem, useToast, Link as ChakraLink } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import LotteryForm from '../components/LotteryForm'
import Header from '../components/Header'
import { Loader } from '../components/Loader'
import { LoginButton } from '../components/Auth'

const currentLotteryId = 'spring2021'

const formatId = id => {
  return id ? `${id[0].toUpperCase()}${id.slice(1, -4)} ${id.slice(-4)}` : ''
}

const enterLottery = (values, actions, toast, callback = x => x) => {
  hit(`/api/lottery/enter?id=${currentLotteryId}&entryMetadata=${encodeURIComponent(JSON.stringify(values))}`)
    .then((data) => {
      actions.setSubmitting(false)
      toast && toast({
        title: 'Entry Received',
        description: 'Your lottery entry has been successfully submitted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      callback(data)
    }).catch(error => {
      toast && toast({
        title: 'Uh-oh',
        description: `We had trouble processing your entry. Please try again! If you continue to have issues, please use the Google Form at the bottom this page and email osca@oberlin.edu.`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.error(error)
    })
}

function CountDown({ now, future }) {
  const remaining = future - now
  return <span>{formatTime(remaining)}</span>
}

class EntrySubmission extends React.Component {
  constructor({ lottery = {} }) {
    super()
    const { latency } = lottery
    this.state = { time: Date.now() + latency }
    this.latency = latency
  }

  componentDidMount() {
    this.interval = setInterval(function () {
      this.setState({ time: Date.now() + this.latency })
    }.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { entry = {}, lottery = {}, toast, setEntry } = this.props
    const { active, start, end, now, latency, lotteryId } = lottery
    this.latency = latency
    return (
      <Box mb={8}>
        {
          this.state.time >= start && end >= this.state.time
            ? <Stack align="center" spacing={4}>
              <LotteryForm countdown={<CountDown now={this.state.time} future={end} />} lottery={lottery} currentEntryValues={entry && entry.entryMetadata} onSubmit={(data, actions) => enterLottery(data, actions, toast, setEntry)} />
              <Stack w="100%" align="center" p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Text m={2} fontSize="lg">Special Interest Co-op Applications:</Text>
                <ChakraLink color="teal.500" isExternal href="https://forms.gle/rLUrToLn6bnJPjpGA">Third World Co-op</ChakraLink>
                <ChakraLink color="teal.500" isExternal href="https://forms.gle/gcgWANdqBxtcdGDr6">Third World Social Justice</ChakraLink>
                <ChakraLink color="teal.500" isExternal href="https://forms.gle/tebC1mBmiX99MhyL6">Old Barrows</ChakraLink>
              </Stack>
              <Stack w="100%" spacing={2} p={5} textAlign="left">
                <Text noOfLines={2} flexWrap="wrap">You may change your entry after submitting up until the close of the lottery. After that, submissions are final.</Text>
                <Text flexWrap="wrap">If for some reason you are unable to submit with this page, please use <ChakraLink isExternal color="teal.500" href="https://forms.gle/HSiLbm2Bon6d41XQ7">the Google Form Version</ChakraLink></Text>
              </Stack>
            </Stack>
            : (
              this.state.time > end
                ? <Text m={2} fontSize="lg">The {/* {formatId(lotteryId)} */} 2021 Fall lottery is now over. We hope you'll enter next round!</Text>
                : <Text m={2} fontSize="lg">The lottery begins in <CountDown now={this.state.time} future={start} /></Text>
            )
        }
      </Box>
    )
  }
}

function Entry({ entry }) {
  let { email, lotteryId, entryId, userData = {}, entryMetadata = {}, timestamp } = entry
  return (
    <Stack w="100%" mt={2} p={2} spacing={4} align="center">
      <CheckIcon w={8} h={8} color="teal.500" />
      <Text fontSize="lg">Thanks for entering, <strong>{email}</strong>!</Text>
      <Text fontWeight="thin">Your entry ID for the <strong>Fall 2021</strong> lottery is <strong>{entryId}</strong>.</Text>
      <Divider />
      <Stack border="1px" borderRadius="md" borderColor="teal.500" p={8} mt={1} spacing={1}>
        <Text mb={2} fontSize="xl">Your current entry: </Text>
        <Text fontWeight="thin">First Name: {entryMetadata.firstName}</Text>
        <Text fontWeight="thin">Last Name: {entryMetadata.lastName}</Text>
        <Text fontWeight="thin">OCMR: {entryMetadata.OCMR}</Text>
        <Text fontWeight="thin">tNumber: {entryMetadata.tNumber}</Text>
        <Text fontWeight="thin">Preferences: </Text>
        <OrderedList my={4}>
          {entryMetadata.preferences && entryMetadata.preferences.map(pref => (
            <ListItem fontWeight="thin" key={pref}>{pref}</ListItem>
          ))}
        </OrderedList>
        <Text>You may also change your entry by resubmitting below.</Text>
      </Stack>
      {/* <pre>{JSON.stringify({ entryMetadata, userData, timestamp }, null, 2)}</pre> */}
    </Stack>
  )
}

function Wall({ condition, children = [], caught = '' }) {
  if (condition) {
    return children
  } else {
    return caught
  }
}

// todo:
// 1. nextjs should have a prefetching mechanism, so that the
// fetch is performed when hovering over a link to this page
// and doesn't have to be re-fetched every render.
// 2. handle users who aren't qualified to enter the lottery
// probably using another endpoint that checks for qualification.
// 3. maybe switch to the firestore clientside library, so that
// we can work with db updates realtime.
const Lottery = (props) => {
  let [session, loading] = useSession()
  const [entry, setEntry] = useState()
  const [lottery, setLottery] = useState()
  const toast = useToast()

  if (session && session.user) {
    const { email } = session.user

    if (!entry || !lottery) {
      loading = true
      hit(`/api/lottery/entries?lotteryId=${currentLotteryId}&email=${email}`).then(data => {
        if (data.length == 1) {
          setEntry(data[0])
        } else {
          setEntry({}) // empty object if no entry in db
        }
      }).catch(err => console.log(err))

      let now = Date.now()
      hit(`/api/lottery/lotteries?lotteryId=${currentLotteryId}`).then(data => {
        if (data.length == 1) {
          const lottery = data[0]
          const latency = lottery.now - now // cynical latency
          now = Date.now() + latency
          setLottery({ ...lottery, latency, now })
        } else {
          setLottery({}) // empty object if no entry in db
        }
      }).catch(err => console.log(err))
    } else {
      loading = false
    }
  }

  return (
    <>
      <Meta title="OSCA 2021 Fall Lottery" />
      <Header />
      <Container>
        <Wall condition={!loading} caught={<Center minH="calc(100vh - 5rem)"><Loader /></Center>}>
          <Wall condition={session && session.user}
            caught={
              <Center minH="calc(100vh - 5rem)">
                <Heading mx={4} fontWeight="thin" color="gray.500">Please <LoginButton fontSize="1.6rem" icon={true} variant="link" text="Login or Create an Account" /> to enter the lottery.</Heading>
              </Center>
            }>

            <Main>
              {!(entry && entry.email)
                ? <EntrySubmission toast={toast} lottery={lottery} setEntry={setEntry} />
                : (
                  <Stack spacing={8}>
                    <Entry entry={entry} />
                    <EntrySubmission toast={toast} entry={entry} lottery={lottery} setEntry={setEntry} />
                  </Stack>
                )
              }
            </Main>
          </Wall>
        </Wall>
        <Footer />
      </Container>
    </>
  )
}

export default Lottery

async function hit(...args) {
  return fetch(...args).then(x => x.json())
}

// single shot latency
// async function latency () {
//   const now = Date.now()
//   const time = await fetch('/api/time')
//   return time - now
// }

function formatTime(total) {
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24) % 30)
  const months = Math.floor(total / (1000 * 60 * 60 * 24 * 30) % 30)
  const years = Math.floor(total / (1000 * 60 * 60 * 24 * 30 * 365) % 365)

  return `
    ${years ? `${years.toString()} ${pluralize('year', years)} ` : ``}
    ${months ? `${months.toString()} ${pluralize('month', months)} ` : ``}
    ${days ? `${days.toString()} ${pluralize('day', days)} ` : ``}
    ${hours ? `${hours.toString()} ${pluralize('hour', hours)} ` : ``}
    ${minutes ? `${minutes.toString()} ${pluralize('minute', minutes)} ` : ``}
    ${seconds ? `${seconds.toString()} ${pluralize('second', seconds)}` : ``}
  `
}

function pluralize(text, count) {
  if (count != 1) {
    return `${text}s`
  }
  return text
}

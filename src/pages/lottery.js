import { useState } from 'react'
import { useSession } from 'next-auth/client'
import Meta from '../components/Meta'
import { Box, Divider, Text, Stack, Center, Heading } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import LotteryForm from '../components/LotteryForm'
import Header from '../components/Header'
import { Loader } from '../components/Loader'

const currentLotteryId = 'spring2021'

const formatId = id => {
  return id ? `${id[0].toUpperCase()}${id.slice(1, -4)} ${id.slice(-4)}` : ''
}

const enterLottery = (values, actions, callback = x => x) => {
  hit(`/api/lottery/enter?id=${currentLotteryId}&entryMetadata=${encodeURIComponent(JSON.stringify(values))}`)
    .then((data) => {
      actions.setSubmitting(false);
      callback(data);
    }).catch(console.error)

  // todo:
  // - [ ] metadata (T#, grad year) + metadata validation
  // - [ ] error handling: missed deadline, unqualifed, etc (see endpoint for errors)
}

function CountDown({ now, future }) {
  const remaining = future - now
  return <span>{remaining / 1000} seconds</span>
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
    }.bind(this), 200)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { lottery = {}, setEntry } = this.props
    const { active, start, end, now, latency, lotteryId } = lottery
    this.latency = latency
    return (
      <Box my={4}>
        {
          this.state.time >= start && end >= this.state.time
            ? <Stack align="center" spacing={4}>
              <LotteryForm onSubmit={(data, actions) => enterLottery(data, actions, setEntry)} />
              <Stack w="100%" p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Text m={2} fontSize="lg">The {formatId(lotteryId)} lottery is open for submissions!</Text>
                <Text color="gray.500" fontWeight="thin" m={2}><CountDown now={this.state.time} future={end} /> remaining</Text>
              </Stack>
            </Stack>
            : (
              this.state.time > end
                ? <Text m={2} fontSize="lg">The {formatId(lotteryId)} lottery is now over. We hope you'll enter next round!</Text>
                : <Text m={2} fontSize="lg">The lottery begins in <CountDown now={this.state.time} future={start} /></Text>
            )
        }
      </Box>
    )
  }
}

function Entry({ entry }) {
  const { email, lotteryId, entryId, userData = {}, entryMetadata = {}, timestamp } = entry
  return (
    <Stack spacing={4} align="center">
      <Text fontSize="lg">Thanks for entering, <strong>{email}</strong>!</Text>
      <Text fontWeight="thin">Your entry ID for the <strong>{formatId(lotteryId)}</strong> lottery is <strong>{entryId}</strong>.</Text>
      <Divider />
      <pre>{JSON.stringify({ entryMetadata, userData, timestamp }, null, 2)}</pre>
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

  if (session && session.user) {
    const { email } = session.user

    if (!entry || !lottery) {
      loading = true
      hit(`/api/lottery/entries?lotteryId=${currentLotteryId}&email=${email}`).then(data => {
        console.log(data)
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
      <Meta title="OSCA 2021 Spring Lottery" />
      <Header />
      <Container>
        <Wall condition={!loading} caught={<Center minH="100vh"><Loader /></Center>}>
          <Wall condition={session && session.user}
            caught={
              <Center minH="100vh">
                <Heading fontWeight="thin" color="gray.500">Login to enter the lottery.</Heading>
              </Center>
            }>

            <Main mt="2rem">
              {!(entry && entry.email) ? <EntrySubmission lottery={lottery} setEntry={setEntry} /> : <Entry entry={entry} />}
            </Main>
          </Wall>
        </Wall>
        <Footer />
        <CTA {...props} />
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

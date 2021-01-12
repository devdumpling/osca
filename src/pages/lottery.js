import { useState } from 'react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import { Button } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import Header from '../components/Header'

import { currentLotteryId } from '../utils'

const formatId = id => {
  return id ? `${id[0].toUpperCase()}${id.slice(1, -4)} ${id.slice(-4)}` : ''
}

const enterLottery = (set = x => x) => {
  hit('/api/lottery/enter').then(set)
  // todo: /api/lottery/enter?entryMetadata={"T-number":"T01223879"}
}

function LotteryHandler ({ email, lotteryId, entryId, entryMetadata={}, set }) {
  return (
    <div>
      {
        !email
          ? <Button onClick={() => enterLottery(set)}>Enter Lottery</Button>
          : <div>
            <h3>Thanks for entering, <strong>{email}</strong>!</h3> 
            <p>Your entry ID for the <strong>{formatId(lotteryId)}</strong> lottery is <strong>{entryId}</strong>.</p>
            <br />
            <pre>{JSON.stringify({ entryMetadata }, null, 2)}</pre>
          </div>
      }
    </div>
  )
}

function Wall ({ condition, children = [], caught = '' }) {
  if (condition) {
    return children
  } else {
    return caught
  }
}

// todo: nextjs should have a prefetching mechanism, so that the
// fetch is performed when hovering over a link to this page
// and doesn't have to be re-fetched every render.
const Lottery = () => {
  let [session, loading] = useSession()
  let [entry, setEntry] = useState()

  if (session && session.user) {
    let { email } = session.user

    if (!entry) {
      loading = true
      const uri = `/api/lottery/entries?lotteryId=${currentLotteryId}&email=${email}`
      hit(uri).then(data => {
        if (data.length == 1) {
          setEntry(data[0])
        } else {
          setEntry({}) // empty object if no entry in db
        }
      }).catch(err => console.log(err))
    } else {
      loading = false
    }
  }

  return (
    <>
      <Head>
        <title>OSCA Lottery</title>
      </Head>
      <Header />
      <Container>
        <Main>
          <Wall condition={!loading} caught={<div>Loading...</div>}>
            <Wall condition={session && session.user} caught={<div>Sorry, please go away</div>}>
              <LotteryHandler {...entry} set={setEntry} />
            </Wall>
          </Wall>
        </Main>
        <Footer />
        <CTA />
      </Container>
    </>
  )
}

export default Lottery

async function hit (...args) {
  return fetch(...args).then(x => x.json())
}
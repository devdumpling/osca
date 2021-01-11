import { useSession } from 'next-auth/client'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import Header from '../components/Header'

const Lottery = () => {
  const [ session, loading ] = useSession()

  return (
    <>
      <Header />
      <Container>
        <Main>
          <div>{loading ? 'Loading...' : ''}</div>
          <div>{session ? 'Authenticated' : 'Sorry, not welcome'}</div>
        </Main>
        <Footer />
        <CTA />
      </Container>
    </>
  )
}

export default Lottery

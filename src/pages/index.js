import Head from 'next/head'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { About } from '../components/About'
import Header from '../components/Header'

const Index = () => (
  <>
    <Head>
      <title>OSCA | Oberlin Student Cooperative Association</title>
    </Head>
    <Header />
    <Container>
      <Hero />
      <Main>
        <About />
      </Main>
      <Footer />
      <CTA />
    </Container>
  </>
)

export default Index

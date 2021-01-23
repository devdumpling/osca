import Meta from '../components/Meta'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import Header from '../components/Header'

const Landing = () => {
  return (
    <>
      <Meta />
      <Header />
      <Container>
        <Hero />
        <Footer />
        <CTA />
      </Container>
    </>
  )
}

export default Landing

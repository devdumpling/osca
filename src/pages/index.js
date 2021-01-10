import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { About } from '../components/About'

const Index = () => (
  <Container>
    <Hero />
    <Main>
      <About />
    </Main>
    <DarkModeSwitch />
    <Footer>      
    </Footer>
    <CTA />
  </Container>
)

export default Index

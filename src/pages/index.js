import {
  Text,
  Link as ChakraLink,
  Input,
  Button,  
} from '@chakra-ui/react'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { About } from '../components/About'

const Index = () => (
  <Container height="100vh">    
    <Hero />
    <Main>      
      <About />
    </Main>
    <DarkModeSwitch />
    <Footer>      
      <Button colorScheme="teal" mx={3} px={8} variant="solid">
        Get email updates
      </Button>
      {/* <Input focusBorderColor="teal.500" color="green.500" textAlign="center" outlineColor="green" placeholder="Sign up for email updates">
      </Input>
      <Button
        colorScheme="green"
        variant="solid"
        mx={3}
        px={8}>
        Submit
      </Button> */}
    </Footer>
    <CTA />
  </Container>
)

export default Index

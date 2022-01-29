import Meta from "../components/Meta";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

import { Heading, Text, Button, Box, Flex } from "@chakra-ui/react";

const Index = () => {
  return (
    <>
      <Meta title="OSCA | Oberlin Student Cooperative Association" />
      <Header />
      <Container>
        <Main mb={16}>
          <Hero />
          <Flex
            flexDirection="column"
            alignSelf="center"
            p={4}
            borderWidth="1px"
            borderRadius="1rem"
          >
            <Box>
              <Heading mb={4}>2022-2023 Lottery</Heading>
              <Text>Open Jan 31</Text>
              <Flex>
                <Button size="lg" colorScheme="green" mt={4} mr={4}>
                  Sign Up
                </Button>
                <Button size="lg" colorScheme="green" mt={4} variant="ghost">
                  Learn More
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Main>
        <Footer />
        <CTA />
      </Container>
    </>
  );
};

export default Index;

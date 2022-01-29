import Meta from "../components/Meta";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

// next link
import Link from "next/link";
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
              <Heading>2022-2023 Lottery</Heading>
              <Text size="sm">Open Jan 28</Text>
              <Flex>
                <Button size="lg" colorScheme="green" mt={4} mr={4}>
                  <Link href="/lottery">Sign Up</Link>
                </Button>
                <Button size="lg" colorScheme="green" mt={4} variant="ghost">
                  <Link href="/faq">Learn More</Link>
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

import Meta from "../components/Meta";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { fetchAPI } from "../lib/strapi/api";

import { Heading, Text, Button, Box, Flex } from "@chakra-ui/react";

const Index = (props) => {
  const { home } = props;
  const { aboutHeading, aboutBody } = home;

  return (
    <>
      <Meta title="OSCA | Oberlin Student Cooperative Association" />
      <Header />
      <Container>
        <Main mb={16}>
          <Hero title={home?.heroTitle} subtitle={home?.heroSubtitle} />
          <Flex
            flexDirection="column"
            alignSelf="center"
            p={4}
            borderWidth="1px"
            borderRadius="1rem"
          >
            <Box>
              <Heading mb={4}>{aboutHeading}</Heading>
              <Text>{aboutBody}</Text>
              <Button size="lg" colorScheme="green" mt={4}>
                Learn More
              </Button>
            </Box>
          </Flex>
        </Main>
        <Footer />
        <CTA />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [pages, home] = await Promise.all([
    fetchAPI("/pages"),
    fetchAPI("/home"),
  ]);

  return {
    props: {
      pages,
      home,
    },
    revalidate: 1,
  };
}

export default Index;

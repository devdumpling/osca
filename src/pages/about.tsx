
import Meta from "../components/Meta";

import { Container } from "../components/Container";
import { Heading, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Meta title={"About"} />
      <Header />
      <Container>
        <Flex flexDirection="column" minHeight="95vh" my={4} p={4}>
          <Heading alignSelf="center" as="h1" size="2xl" my={4}>
            OSCA
          </Heading>          
        </Flex>
        <Footer />
      </Container>
    </>
  );
};

export default About;

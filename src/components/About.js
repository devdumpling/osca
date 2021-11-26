import { Heading, Flex, Text, VStack } from "@chakra-ui/react";

import { Container } from "./Container";

const About = () => (
  <Container mb="8rem" textAlign="left">
    <Flex wrap="wrap">
      <VStack spacing={8} mx={4}>
        <Heading mb={2}>Heading</Heading>
        <Text fontSize="lg">WIP</Text>
      </VStack>
    </Flex>
    <style jsx>{`
      p {
        margin-bottom: 1rem !important;
      }
    `}</style>
  </Container>
);

export default About;

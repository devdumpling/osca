import Meta from "../components/Meta";
import { Container } from "../components/Container";
import { Heading, Flex } from "@chakra-ui/react";
import Header from "../components/Header";

const PaymentSuccess = () => {
  return (
    <>
      <Meta title={"Payment Success"} />
      <Header />
      <Container>
        <Flex
          textAlign="left"
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight="calc(100vh - 5rem)"
        >
          <Heading
            bgGradient="linear(to-l, teal.500, green.500)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="bold"
            mx={16}
          >
            Thank you!
          </Heading>
          <Heading m={4} fontSize="xl">
            Your payment was successful.
          </Heading>
        </Flex>
      </Container>
    </>
  );
};

export default PaymentSuccess;

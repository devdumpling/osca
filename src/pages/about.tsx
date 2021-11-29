import Meta from "../components/Meta";

import { Container } from "../components/Container";
import { Heading, Flex, Text, Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchAPI } from "../lib/strapi/api";
import ReactMarkdown from "react-markdown";

const markdownComponents = {
  h1: (props) => <Heading as="h1" size="2xl" {...props} />,
  h2: (props) => <Heading as="h2" size="xl" {...props} />,
  h3: (props) => <Heading as="h3" size="lg" {...props} />,
  h4: (props) => <Heading as="h4" size="md" {...props} />,
  h5: (props) => <Heading as="h5" size="sm" {...props} />,
  h6: (props) => <Heading as="h6" size="xs" {...props} />,
  p: (props) => <Text as="p" {...props} />,
};

const About = (props) => {
  const { about } = props;
  const { metadata } = about;

  return (
    <>
      <Meta
        title={metadata?.metaTitle || "About"}
        description={metadata?.metaDescription}
      />
      <Header />
      <Container>
        <Flex flexDirection="column" minHeight="95vh" my={4} p={4}>
          <Heading alignSelf="center" as="h1" size="2xl" my={4}>
            {about?.title}
          </Heading>
          <Box m={2} p={2}>
            <ReactMarkdown components={markdownComponents}>
              {about?.copy}
            </ReactMarkdown>
          </Box>
        </Flex>
        <Footer />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const about = await fetchAPI("/about");

  return {
    props: {
      about,
    },
    revalidate: 1,
  };
}

export default About;

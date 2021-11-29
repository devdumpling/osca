import { Fade, Flex, Text, Heading } from "@chakra-ui/react";
import { HeroProps } from "../types/components";

export const Hero = ({ title, subtitle }: HeroProps) => (
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    height="calc(100vh - 5rem)"
  >
    <Heading
      bgGradient="linear(to-l, teal.500, green.500)"
      bgClip="text"
      fontSize="7xl"
      fontWeight="bold"
    >
      {title}
    </Heading>
    <Fade in={true}>
      <Text fontWeight="thin" py={2} fontSize="xl" textAlign="center">
        {subtitle}
      </Text>
    </Fade>
  </Flex>
);

Hero.defaultProps = {
  title: "OSCA",
  subtitle: "Oberlin Student Cooperative Association",
};

import { Fade, Flex, Text, Heading } from "@chakra-ui/react";
import { HeroProps } from "../types/components";

export const Hero = ({ title, subtitle }: HeroProps) => (
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    minHeight="16rem"    
  >
    <Heading
      as="h1"
      bgGradient="linear(to-l, teal.500, green.500)"
      bgClip="text"
      fontSize="8rem"
      fontWeight="bold"
    >
      {title}
    </Heading>
    <Fade in={true}>
      <Text fontWeight="thin" py={2} fontSize="2xl" textAlign="center">
        {subtitle}
      </Text>
    </Fade>
  </Flex>
);

Hero.defaultProps = {
  title: "OSCA",
  subtitle: "Oberlin Student Cooperative Association",
};

import {
  Img,
  Box,
  Divider,
  Stack,
  Text,
  Heading,
  Flex,
  Link as ChakraLink,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

export const Footer = (props) => (
  <Box width="100%">
    <Divider width="100%" />
    <Flex
      wrap="wrap"
      width="100%"
      align="center"
      justify="center"
      as="footer"
      py="8rem"
      {...props}
    >
      <Img
        mx={{ base: 2, md: 8 }}
        boxSize="100px"
        objectFit="cover"
        src="/assets/480px-Twinpines.svg.png"
        alt="OSCA Logo"
      />
      <Stack
        borderRight={{ base: "0px", md: "2px" }}
        pr={{ base: 0, md: 8 }}
        mb={{ base: 4, md: 0 }}
        textAlign={{ base: "center", md: "left" }}
        spacing={4}
        mx={4}
      >
        <Heading size="2xl">Stay in touch</Heading>
        <Text>OSCA needs your feedback now more than ever.</Text>
      </Stack>
      <List spacing={3} mx={4}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://www.oberlin.edu/alumni-association/groups/oscalums"
            flexGrow={1}
            mr={2}
          >
            OSCAlums <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://www.instagram.com/oscacoops/"
            flexGrow={1}
            mr={2}
          >
            Instagram <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://www.facebook.com/Oberlin-Student-Cooperative-Association-218110806562/"
            flexGrow={1}
            mr={2}
          >
            Facebook <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="http://osca.csr.oberlin.edu/"
            flexGrow={2}
            mr={2}
          >
            Old Website <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Flex>
  </Box>
);

export default Footer;

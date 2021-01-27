import { Flex, Heading, Link } from "@chakra-ui/react"
import NextLink from 'next/link'

export default function Logo(props) {
  return (
    <Flex align="center" mr={5} {...props}>
      <Heading as="h1" size="lg">
        <Link as={NextLink} href="/">OSCA</Link>
      </Heading>
    </Flex>
  )
}
import React, { useState } from "react"
import { Heading, Box, Flex, Text, Link } from "@chakra-ui/react"
import { Account } from "./Auth"
import NextLink from 'next/link'

import { DarkModeSwitch } from './DarkModeSwitch'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

const Header = props => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Link as={NextLink} href="/">OSCA</Link>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems><Link as={NextLink} href="/lottery">Spring 2021 Lottery</Link></MenuItems>
        <MenuItems><Link as={NextLink} href="/alumni">Alumni</Link></MenuItems>
        <MenuItems><Link as={NextLink} href="/blog">Blog</Link></MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Account />
      </Box>

      <DarkModeSwitch />
    </Flex>
  )
}

export default Header
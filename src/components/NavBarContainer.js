import { Flex, useColorMode } from "@chakra-ui/react"

export default function NavBarContainer({ children, ...props }) {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  const color = { light: 'black', dark: 'white' }

  return (
    <Flex
      position="sticky"
      top="0"
      as="nav"
      align="center"
      wrap="wrap"
      w="100%"
      minH="5rem"
      p={4}
      boxShadow="base"
      zIndex="10"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    >
      {children}
    </Flex>
  )
}
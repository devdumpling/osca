import { Flex, useColorMode } from "@chakra-ui/react"

export default function NavBarContainer({ children, ...props }) {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  const color = { light: 'black', dark: 'white' }

  return (
    <Flex
      position="fixed"
      top="0"
      as="nav"
      align="center"
      wrap="wrap"
      w="100%"
      p={4}
      boxShadow="base"
      zIndex="2"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    >
      {children}
    </Flex>
  )
}
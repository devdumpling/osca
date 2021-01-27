import { Box } from "@chakra-ui/react"
import { Account } from "./Auth"

export default function LoginButton({ isOpen }) {
  return (
    <Box      
      display={{ sm: isOpen ? "block" : "none", md: "block" }}      
      px={2}
      mx={4}
    >      
      <Account />
    </Box>
  )
}
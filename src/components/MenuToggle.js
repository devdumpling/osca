import { Box } from "@chakra-ui/react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box
      display={{ base: "block", md: "none" }}      
      mx={4}
      onClick={toggle}>
      {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </Box>
  )
}
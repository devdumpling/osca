import { Box } from "@chakra-ui/react";
import { Account } from "./Auth";

export default function LoginButton({ isOpen }) {
  return (
    <Box display={{ sm: isOpen ? "block" : "none", md: "block" }} mx={2}>
      <Account />
    </Box>
  );
}

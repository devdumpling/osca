import { Box, Stack } from "@chakra-ui/react"
import { MenuItem } from "./MenuItem"
import LoginButton from "./LoginButton"
import { DarkModeSwitch } from './DarkModeSwitch'

export const MenuLinks = ({ isOpen }) => (
  <Box
    display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    <Stack
      spacing={4}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to="/lottery">Fall 2021 Lottery</MenuItem>
      <MenuItem to="/alumni">Alumni</MenuItem>
      <LoginButton isOpen={isOpen} />
      <DarkModeSwitch />
    </Stack>
  </Box >
)
import { useColorMode, Switch, Box } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Box onClick={toggleColorMode}>
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Box>
    // <Switch
    //   size="md"
    //   colorScheme="green"
    //   isChecked={isDark}
    //   onChange={toggleColorMode}
    // />
  )
}

import { useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton variant="ghost" onClick={toggleColorMode} icon={isDark ? <MoonIcon color="teal.500" /> : <SunIcon color="orange.500" />} />
  )
}

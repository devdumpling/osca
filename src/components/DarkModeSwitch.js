import { useColorMode, Switch } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      size="md"
      colorScheme="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  )
}

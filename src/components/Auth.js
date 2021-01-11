import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Flex, Button, Avatar } from '@chakra-ui/react'

const isBrowser = () => typeof window !== 'undefined'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button colorScheme="transparent" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  )
}

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <Button colorScheme='transparent' onClick={() => logout({ returnTo: isBrowser() ? window.location.origin : '' })}>
      Log Out
    </Button>
  )
}

const Account = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (isAuthenticated) {
    return (
      <Flex align="center">
        <Avatar size="sm" name={user.name} src={user.picture} mx={2} />
        {user.email}
        <LogoutButton />
      </Flex>
    )
  } else {
    return <LoginButton />
  }
}

export {
  LoginButton,
  LogoutButton,
  Account
}

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Flex, Button, Avatar } from '@chakra-ui/react'

const LoginButton = () => {
  return (
    <Button colorScheme="transparent" onClick={() => signIn('auth0', { prompt: 'login' })}>
      Log In
    </Button>
  )
}

const LogoutButton = () => {
  return (
    <Button colorScheme='transparent' onClick={() => signOut('auth0')}>
      Log Out
    </Button>
  )
}

const Account = () => {
  const [ session, loading ] = useSession()

  if (loading) {
    return <div>Loading ...</div>
  }

  if (session) {
    const { user } = session

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

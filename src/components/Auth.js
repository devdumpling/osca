import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Flex, Text, Button, Avatar } from '@chakra-ui/react'

const LoginButton = () => {
  return (
    <Button colorScheme="teal" variant="outline" onClick={() => signIn('auth0', { prompt: 'login' })}>
      Log In
    </Button>
  )
}

const LogoutButton = ({loading}) => {
  return (
    <Button colorScheme="teal" variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
      Log Out
    </Button>
  )
}

const Account = () => {
  const [ session, loading ] = useSession()

  if (loading) {
    return <Button colorScheme="teal" variant="outline" isLoading={loading}></Button>
  }

  if (session) {
    const { user } = session

    return (
      <Flex align="center">
        <Avatar size="sm" name={user.name} src={user.picture} mx={2} />
        <Text fontSize="sm" mx={2}>{user.email}</Text>
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

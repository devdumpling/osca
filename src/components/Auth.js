import React from "react";
import { configureScope, setUser } from "@sentry/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Flex, Text, Button, Avatar } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

const LoginButton = ({ text, icon, ...props }) => {
  return (
    <Button
      leftIcon={icon && <Icon as={IoLogInOutline} w={6} h={6} />}
      colorScheme="teal"
      variant="outline"
      onClick={() => signIn("auth0", { prompt: "login" })}
      {...props}
    >
      {text ? text : `Log In`}
    </Button>
  );
};

const LogoutButton = ({ loading, icon, text, ...props }) => {
  return (
    <Button
      leftIcon={icon && <Icon as={IoLogOutOutline} w={6} h={6} />}
      colorScheme="teal"
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      {text ? text : `Log Out`}
    </Button>
  );
};

const Account = () => {
  // https://next-auth.js.org/getting-started/upgrade-v4
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return (
      <Button colorScheme="teal" variant="outline" isLoading={loading}></Button>
    );
  }

  if (session) {
    const { user } = session;
    setUser({ email: user.email });

    return (
      <Flex align="center">
        <Avatar size="sm" name={user.name} src={user.picture} mr={2} />
        <Text
          display={{ base: "none", md: "flex" }}
          isTruncated
          maxW={{ base: "6rem", md: "12rem" }}
          fontWeight="thin"
          mr={4}
        >
          {user.email}
        </Text>
        <LogoutButton mx={2} />
      </Flex>
    );
  } else {
    configureScope((scope) => scope.setUser(null));
    return <LoginButton />;
  }
};

export { LoginButton, LogoutButton, Account };

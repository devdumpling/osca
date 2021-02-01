import { Button, Link } from '@chakra-ui/react'
import NextLink from "next/link"

export const MenuItem = ({ children, isLast, to = "/", ...rest }) => (
  <Link as={NextLink} href={to}>
    <Button variant="ghost" display="block" {...rest}>
      {children}
    </Button>
  </Link>
)
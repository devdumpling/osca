import React, { useState } from "react"
import { MenuToggle } from './MenuToggle'
import { MenuLinks } from "./MenuLinks"
import Logo from "./Logo"
import NavBarContainer from "./NavBarContainer"
import { Spacer } from "@chakra-ui/react"

const Header = props => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props}>
      <Logo />
      <Spacer />
      <MenuToggle toggle={handleToggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />      
    </NavBarContainer>
  )
}

export default Header

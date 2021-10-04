import React from 'react';
import logoGif from '../../images/ethclusive.gif'
import logoLetras from '../../images/LogoLetras.png'
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    NavLink,
    MobileIcon,
    NavMenu,
    NavItem,
    NavItemBtn,
    NavLinks,
    NavBtnLink
  } from './Navbar.elements';
  import {
    InfoSec,
    InfoRow,
    InfoColumn,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img
  } from '../../components/InfoSection/InfoSection.elements';
    
  
  
  function SimpleNavbar(){
      return(
        <Nav>
            <NavbarContainer>
            <NavLogo>
            <img src={logoGif}  width="80"></img>
            <img src={logoLetras} height="40" width="170"/>
            </NavLogo>
            </NavbarContainer>
            
        </Nav>
      );
  }
  
  export default SimpleNavbar;
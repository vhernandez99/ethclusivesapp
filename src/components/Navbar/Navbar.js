import React, { useState, useEffect,Component } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import logoGif from '../../images/ethclusive.gif'
import logoLetras from '../../images/LogoLetras.png'
import telegramIcono from '../../images/telegram.png'
import twitterIcono from '../../images/twitter.png'
import connectButton from '../../images/connectButton.png'
import connectedButton from '../../images/connectedButton.png'
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
//test
import PropTypes from "prop-types";
import styled from "styled-components";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

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

function Navbar() {
  
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <Router>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo>
            <img src={logoGif}></img>
            <img src={logoLetras} height="80" width="200"/>
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              {/* <NavItem>
                <NavLink href="https://t.me/Ethclusives">
                  Connect to Metamask
                </NavLink>
              </NavItem> */}
              <NavItemBtn>
                {button ? (
                  <NavBtnLink>
                    {blockchain.account === "" ||
                    blockchain.smartContract === null ?(
                    <img src={ connectButton} onClick={(e)=>{
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}></img>
                  ) : (
                    <img src={ connectedButton} onClick={(e)=>{
                    }}></img>
                  )}
                    <NavLogo>
                      <InfoRow>
                      <InfoColumn>
                        <NavLogo>
                        <img src={telegramIcono}  width="35"></img>
                        </NavLogo>
                        <NavLogo>
                        <img src={twitterIcono}  width="35"/>
                        </NavLogo>
                        
                      </InfoColumn>
                      
                      </InfoRow>
                    </NavLogo>
                    
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to='/sign-up'>
                    <Button onClick={closeMobileMenu} fontBig primary>
                      SIGN UP
                    </Button>
                  </NavBtnLink>
                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </Router>
  );
}

export default Navbar;

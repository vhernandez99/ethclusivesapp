import React, { useState, useEffect,Component } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button,Container,LinkA } from '../../globalStyles';
import logoGif from '../../images/ethclusive.gif'
import logoLetras from '../../images/LogoLetras.png'
import telegramIcono from '../../images/telegram.png'
import twitterIcono from '../../images/twitter.png'
import connectButton from '../../images/connectButton.png'
import connectedButton from '../../images/connectedButton.png'
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Navbar.css'

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
  const [show, setShow] = useState(true)
    const controlNavbar = () => {
        if (window.scrollY > 10) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [])
    return (
     
      <Router>
       <div className={`nav ${show && 'nav__blue'}`}>
        <NavbarContainer>
          <ImgWrapper JustifyContent="Start"
          WidthPercentage="0"> 
          <img src={logoLetras} height="40" width="170" />
          </ImgWrapper>
          <NavMenu>
            <NavItemBtn>
                <a>
                  {blockchain.account === "" ||
                  blockchain.smartContract === null ?(
                  <img src={ connectButton} onClick={(e)=>{
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}></img>
                ) : (
                  <img src={ connectedButton}></img>
                )}
                    </a>
            </NavItemBtn>

            <NavItemBtn >
            <a href="https://twitter.com/Ethclusive_Art">
              <img className="spring" Src={twitterIcono} width="35"></img>
            </a>
            </NavItemBtn>
            &nbsp;  &nbsp;
            <NavItemBtn >
            <a href="https://t.me/Ethclusives">
              <img className="spring" Src={telegramIcono} width="35"></img>
            </a>
            </NavItemBtn>
          </NavMenu>
        </NavbarContainer>
        </div>
    </Router>
    
    )
  
}

export default Navbar;

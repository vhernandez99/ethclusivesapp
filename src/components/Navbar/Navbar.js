import React, { useState, useEffect,Component } from 'react';
import logoLetras from '../../images/LogoLetras.png'
import telegramIcono from '../../images/telegram.png'
import discordIcono from '../../images/discord.png'
import twitterIcono from '../../images/twitter.png'
import connectButton from '../../images/connectButton.png'
import connectedButton from '../../images/connectedButton.png'
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import './Navbar.css'

import {
  NavbarContainer,
  NavMenu,
  NavItemBtn,
  NavLogo,
} from './Navbar.elements';
import {
  ImgWrapper,
} from '../../components/InfoSection/InfoSection.elements';

function Navbar() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  const [show, setShow] = useState(true)
  console.log(window.scrollY);
    const controlNavbar = () => {
        if (window.scrollY >= 5) {
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
     

       <div className={`nav ${show && 'nav__blue'}`}>
        <NavbarContainer>
          <NavLogo> 
          <img src={logoLetras} height="40" width="170" />
          </NavLogo>
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
                  <img src={ connectedButton} ></img>
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
            &nbsp;  &nbsp;
            <NavItemBtn >
            <a href="https://discord.gg/x7pmhP9Zy8">
              <img className="spring" Src={discordIcono} width="35"></img>
            </a>
            </NavItemBtn>
          </NavMenu>
        </NavbarContainer>
        </div>

    
    )
  
}

export default Navbar;

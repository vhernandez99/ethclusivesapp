import React,{useEffect, useState, useRef} from 'react';
import {Pinkcontainer } from '../../globalStyles';
import Slider from "../ Slider/Slider";
import Timer from "../../components/Timer/Timer"
import Mint from "../../components/Mint/Mint"
import Footer from "../../components/Footer/Footer"
import Roadmap from "../../images/Roadmap.png"
import EthFamily from "../../images/EthclusivesFamily.png";
import Team from "../../images/Team.png";
import './Home.css'
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  InfoColumnMintingQty,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Input,
} from '../InfoSection/InfoSection.elements';
function Home() {
  return (
    <div className="main">
      <ImgWrapper position="absolute">
          <img src="https://ethclusiveart.com/files/intro.gif" className="imgClass"
          loop="true"></img>
        </ImgWrapper>
      <hr className="ColorLine" color="#262626"/>
      <br/>
      <br/>
        <Mint/>
       <br/>
       <br/>
       <br/>
       <br/>
        <hr className="ColorLine" color="#262626"/>
        <ImgWrapper position="absolute" MarginBottom="100">
          <img src={EthFamily} className="imgClassEthclusiveFamily"
          ></img>
        </ImgWrapper>
       
        <ImgWrapper>
          <Slider>
          </Slider>
        </ImgWrapper>
        <ImgWrapper position="absolute" MarginTop="150">
          <img src={Roadmap} className="imgClass"
          ></img>
        </ImgWrapper>
        <ImgWrapper position="absolute" MarginTop="150" >
          <img src={Team} className="imgClassTeamImage"
          ></img>
        </ImgWrapper>
        <Footer></Footer>
    </div>
  );
}
export default Home;

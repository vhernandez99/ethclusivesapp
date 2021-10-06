import React,{useEffect, useState, useRef} from 'react';
import {Pinkcontainer } from '../../globalStyles';
import Slider from "../ Slider/Slider";
import Timer from "../../components/Timer/Timer"
import Mint from "../../components/Mint/Mint"
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
  const startDate = new Date().getTime() + 1198800000;
  return (
    <div className="main">
      <ImgWrapper position="absolute">
          <img src="https://ethclusiveart.com/files/intro.gif" className="imgClass"
          loop="true"></img>
        </ImgWrapper>
      <hr className="ColorLine"/>
          <Timer startDate={startDate} />
        <br/>
        <br/>
        <br/>
        <ImgWrapper>
          <Slider>
          </Slider>
        </ImgWrapper>
        <Mint/>
        <hr className="ColorLine"/>
    </div>
  );
}
export default Home;

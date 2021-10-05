import React,{useEffect, useState, useRef} from 'react';
import ReactPlayer from 'react-player'
import styled from "styled-components";
import {Container, Button,Pinkcontainer } from '../../globalStyles';
import minting from '../../images/minting.png'
import mint from '../../images/mint.png'
import logoGif from '../../images/Logo.gif'
import logoLetras from '../../images/LogoLetras.png'
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import Slider from "../ Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
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
  ImgWraperMargin,
  Img,
  Input

} from '../InfoSection/InfoSection.elements';
function Home() {
  const[mintValue, SetMintValue] = useState(0);
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Ethclusive NFT...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: "0x827acb09a2dc20e39c9aad7f7190d9bc53534192",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.08 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Etclusive NFT go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  useEffect(() => {
    getData();
  }, [blockchain.account]);
  return (
    <div className="main">
      <ImgWrapper>
          <img src="https://ethclusiveart.com/files/intro.gif" className="imgClass"
          loop="true"></img>
        </ImgWrapper>
        <InfoRow black>
          <InfoColumn>
            {claimingNft ?(
              <ImgWrapper start="flex-start">
              <img src={minting} width="450"></img>
              </ImgWrapper>
            ):(
              <ImgWrapper start="flex-start">
              <img src={mint} width="450"  onClick={(e) => {
                      if(claimingNft|| blockchain.account===""||
                      blockchain.smartContract===null){
                        return;
                      }
                      else{
                        e.preventDefault();
                        claimNFTs(mintValue);
                        getData();
                      }}}>
              </img>
              </ImgWrapper>
            )}
          </InfoColumn>
          <InfoColumnMintingQty>
            <Pinkcontainer BigPadding BorderSquare> 
            <TextWrapper>
            <Heading blueText >
              Buy your ethclusives!
            </Heading>
            <Subtitle pinkColor>Enter the amount of Ethclusives you would like to buy, whitelisted users can mint up to 8 Ethclusives (presale and public sale)</Subtitle>
            </TextWrapper>
            <Pinkcontainer Big PinkColor>
              <TextWrapper>
                <TopLine textColor="#08FAF6">
                  PRICE PER ETHCLUSIVE NFT 
                </TopLine>
                <InfoRow>
                <Heading textColor="#08FAF6" paddingLeft="12">
                  0.08 &nbsp;   
                </Heading>
                <Heading>
                  ETH &nbsp; &nbsp;        
                </Heading>
                <TopLine textColor="Yellow" >
                  {10033-Number(data.totalSupply)} remaining!
                </TopLine>
                </InfoRow>
              </TextWrapper>
              
            </Pinkcontainer>
     
            <br/>
            <hr color="#FF11FA" />
            <br/>
            <Pinkcontainer Big PinkColor>
              <TextWrapper>
                <InfoRow>
                <Input onChange={event=>SetMintValue(event.target.value)} disabled={blockchain.account=== "" || blockchain.smartContract===null ? 1: 0}>
                    
                </Input>
                <TopLine textColor="Yellow">
                  5 Ethclusives max
                </TopLine>
                </InfoRow>
              </TextWrapper>
              
            </Pinkcontainer>
            </Pinkcontainer>
          </InfoColumnMintingQty>
          
        </InfoRow>
        <br/>
        <br/>
        <Slider>
          
        </Slider>
        

    </div>
  );
}

export default Home;

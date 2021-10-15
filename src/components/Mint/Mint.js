import React, { useState, useEffect,Component } from 'react';
import { connect } from "../../redux/blockchain/blockchainActions";
import './Mint.css'
import minting from '../../images/minting.png'
import MintingContainer from '../../components/Mint/MintContainer'
import mint from '../../images/mint.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/data/dataActions";
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
  InfoColumnMintingQty,
  InfoColumnVertical,
  Input,
  InfoColumnVerticalEnd,
  ImgWraperMargin
} from '../../components/InfoSection/InfoSection.elements';
import{
    Container,
}from '../../globalStyles'
function Mint() {
  const startDate = new Date().getTime() +1634601600;
  const dispatch = useDispatch ();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const[mintValue, SetMintValue] = useState(0);
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
    return(
            <InfoRow>
            <InfoColumn>
          {claimingNft ?(
            <ImgWrapper start="flex-start">
            <img src={minting} width="750"></img>
            </ImgWrapper>
          ):(
              <ImgWrapper start="flex-start" MarginTop="-150">
               <img src={mint} width="750"  onClick={(e) => {
                    if(claimingNft|| blockchain.account===""||
                    blockchain.smartContract===null){
                        e.preventDefault();
                        dispatch(connect());
                        getData();
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
         
          <MintingContainer/>
         
        
         
 
              
        
          
          {/* <InfoColumnVertical> 
              <ImgWrapper JustifyContent="end" WidthPercentage="80"> 
              <img className="CornerFlag" src={Corner} width="50"></img>
              </ImgWrapper>
                    <ImgWrapper HeightPx="330" >
                    <Timer/>
                    </ImgWrapper>
            
            
              
          </InfoColumnVertical> */}

         
            </InfoRow>
          
    
        // {/* <InfoColumnMintingQty>
        //   <Pinkcontainer BigPadding BorderSquare> 
        //   <TextWrapper>
        //   <Heading blueText >
        //     Buy your ethclusives!
        //   </Heading>
        //   <Subtitle pinkColor>Enter the amount of Ethclusives you would like to buy, whitelisted users can mint up to 8 Ethclusives (presale and public sale)</Subtitle>
        //   </TextWrapper>
        //   <Pinkcontainer Big PinkColor>
        //     <TextWrapper>
        //       <TopLine textColor="#08FAF6">
        //         PRICE PER ETHCLUSIVE NFT 
        //       </TopLine>
        //       <InfoRow>
        //       <Heading textColor="#08FAF6" paddingLeft="12">
        //         0.08 &nbsp;   
        //       </Heading>
        //       <Heading>
        //         ETH &nbsp; &nbsp;        
        //       </Heading>
        //       <TopLine textColor="Yellow" >
        //         {10033-Number(data.totalSupply)} remaining!
        //       </TopLine>
        //       </InfoRow>
        //     </TextWrapper>
        //   </Pinkcontainer>
        //   <br/>
        //   <br/>
        //   <Pinkcontainer Big PinkColor>
        //     <TextWrapper>
        //       <InfoRow>
        //       <Input onChange={event=>SetMintValue(event.target.value)} disabled={blockchain.account=== "" || blockchain.smartContract===null ? 1: 0}>
        //       </Input>
        //       <TopLine textColor="Yellow">
        //         5 Ethclusives max
        //       </TopLine>
        //       </InfoRow>
        //     </TextWrapper>
            
        //   </Pinkcontainer>
        //   </Pinkcontainer>
        // </InfoColumnMintingQty> */}
        // <hr className="ColorLine"/>
      
    
    
    );
   }

export default Mint;

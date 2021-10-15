import Corner from '../../images/Corner.png'
import Brain from '../../images/Brain.png'
import { connect } from "../../redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect,Component } from 'react';
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
import('./MintContainer.css')

function MintContainer (){
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

        <div class="card-tirty-container">
                <div class="card-container-heading" >
                    <div>
                        <h1 className="PinkTitle">Ethclusives</h1>
                        <h1 className="Subtitle">Whitelist can mint up to 5 Ethclusives</h1>
                    </div>
                    <div class="card-container-head2">
                        <img src={Corner} alt="" width="90"/>
                    </div>
                </div>
                <div class="card-container-price">
                    <div class="container-price1">
                        <img src={Brain}/>
                    </div>
                    <div class="container-price2">
                        <h3 className="Subtitle">Price per Ethclusive</h3>
                        <h3 className="Subtitle">0.08 ETH Each</h3>
                        <h3></h3>
                        {/* <h1><Span>0.08 </Span>ETH Each</h1> */}
                        <br/>
                        <h4 className="Subtitle">{10033-Number(data.totalSupply)} remaining!</h4>
                    </div>
                </div>
                <div class="container-price">
                    <input type="number" onChange={event=>SetMintValue(event.target.value)} 
                    disabled={blockchain.account=== "" || blockchain.smartContract===null ? 1: 0} 
                    className="MintAmount" className="Subtitle">
                    </input> 
                    <h3 className="Subtitle">5 MAX</h3>
                </div>
                <div class="card-container-total">
                    <br/>
                    <div class="card-container-total1">
                        <h3 className="Title">Total</h3>
                        <h1 className="Title">0 ETH</h1>
                    </div>
                    <br/>
                </div>
                <div class="card-container-total2">
                   <button className="btn Subtitle" onClick={(e) => {
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
                    }}}>Mint</button>
                </div>
        </div>


    );
}
export default MintContainer;
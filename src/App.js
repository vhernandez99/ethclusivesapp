import React, {useEffect, useState, useRef} from 'react';
import GlobalStyle from './globalStyles';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Navbar, Footer } from './components';
import styled from "styled-components";
import { Container, Button } from './globalStyles';
import logoGif from './images/Logo.gif'
import logoLetras from './images/LogoLetras.png'
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import ReactPlayer from 'react-player/file'

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
} from './components/InfoSection/InfoSection.elements';

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

function App() {
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
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
        <ImgWrapper lightBg={false}> 
          <ReactPlayer playing url='https://ethclusiveartvide-990232405770.s3-accesspoint.us-east-2.amazonaws.com/2.webm?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIGHCLEoDPn7W0wK%2FjYh%2FBrLK5S5YqFjdjatvCLVId1fFAiBFaX2pj6R0C3v8utP1pzJD%2FXORIDPPxtEG4j%2F7gH9Fuir2AggnEAAaDDk5MDIzMjQwNTc3MCIMlg9%2BrTeDj0DWiTutKtMCkAMwaqsM1%2Fbkwn0E3nQl0QkgR2jqdtdTkUHHjeH2Y31AoXWLMX008NLKN0GyRT%2Fnn8%2FQozG6i1%2FCzYmtM0S6fVr50jzG6zb%2FoSShIARQu%2BqMUEvjUXAZ1xQIFrgEaSFEgx6aHgv9VMBTn6cwcXB0pSAdtmWlAEJ9M258vxRYvnWSHu1NLwyiOwF%2Bk8OjWMFta4ISjDJ4rZ3vvNCkd41Dseki51EkgGXglxPfKq9fiOFXtfFcSvRab2w6zmZ1W7aXKphNmoYAeITCE%2F5sih05a5ki1rSogHzbUtE7apu5tkHFvTmXCrDgrQDzyAVVDDvcu4siL%2B%2FsBvXUfirpbJVL1NorEyiqGiJZM8Iw5LG5X9gLUrk81isQMZB%2BQZ1kiMx3SakZhsGwivWaR0blxKvXFrtq44K%2FgFE567hk6D%2BXBhGRNGYCJBwQIAjDmq%2Bbi%2FjP0VALMJXl44oGOrQC7P5IkquMbWwFkr4oNGTEn%2BjnIpzsx7qSd7%2B4UygHhzfqcT6XUNbnL3HvisoV0aZ%2FNOnkjdO9MOZ2LLeBywDig73S%2BGdE1%2BHajZPTNmf7mOMdJDrwvSq7g39r0h6mcL0dn6c6yD7kCaOdxLhzbZxEScbnVxE1B%2ByuU%2FyzC%2Bb%2Bl7WWAfa4%2FxQxeIhFs0WonP6tIw4q7jSicIJiK%2BTBr5fvmGRljDBkkhp3397YMdo%2BFc4xOq26xWUqg4iP%2FPOW8luvf8YTDxczuJuIPHbnUpApf074Gw%2Bmur2ctKE9TqdieCpNOv2spITvRZW7Aqnk0n5I4bhLBgf2WemLpHqOCLY4zzm2wgJh%2F5lCWqIboHkkc0IZJBXHDITWyude5kl7e4rSohw2lYa8QUmn7S1tAGu7XKnj8ss%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20211003T060912Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA6NDTTM4FNOONH65E%2F20211003%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=2995c7ee23275650163691471587b226d6fda21f8ca89a0aa3e2b6326edd39d1' loop="true"></ReactPlayer>
        </ImgWrapper>    
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/sign-up' component={SignUp} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
 } 
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  height:100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right:50px;
  padding-left: 50px;
  

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Pinkcontainer = styled.div`
  border-width:0.1px;
  border-radius:${({BorderSquare})=>(BorderSquare ? '20px' : '10px')};
  background:${({PinkColor})=>(PinkColor ? '#FE8CED' : '')};
  padding:${({BigPadding})=>(BigPadding ? '30px' : '10px')};
  border-style: solid;
  border-color: #FF11FA;
  z-index: 1;
  width: ${({Big})=>(Big ? '100%' : '75%')};
  height:100%;
  
  max-width: 1300px;
  //margin-right: auto;
  //margin-left: auto;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;


export const Button = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#4B59F7' : '#0467FB')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#0467FB' : '#4B59F7')};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export default GlobalStyle;

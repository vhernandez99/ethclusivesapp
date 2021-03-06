import styled from 'styled-components';

export const InfoSec = styled.div`
  top:0;
  color: yellow;
  padding: 10px 0;
  background: ${({ lightBg }) => (lightBg ? '#fff' : 'Black')};
`;

export const InfoRow = styled.div`
  color: ${({ Color }) => (Color ? `${Color}` : 'red')};
  background: ${({ BackgroundColor }) => (BackgroundColor ? `${BackgroundColor}` : 'transparent')};
  display: flex;
  flex-wrap: nowrap;
  justify-content:center;
  align-items:  ${({ AlignItems }) => (AlignItems ? `${AlignItems}` : 'flex-start')};
  margin-right:150px;
  height:450px;
  margin-left:${({ MarginLeft }) => (MarginLeft ? `${MarginLeft}px` : 0)};
  margin-top:${({ MarginTop }) => (MarginTop ? `${MarginTop}px`: 0)};
  margin-bottom:${({ MarginBottom }) => (MarginBottom ? `${MarginBottom}px`: 0)};
  width:${({ WidthPercentage }) => (WidthPercentage ? `${WidthPercentage}px`: 'Auto')};
  


`;

export const InfoColumn = styled.div`
  margin-bottom: -8px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  display: flex;
  justify-content:end;
  max-width: 50%;
  flex-basis: 50%;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const InfoColumnVertical = styled.div`
  margin-bottom: -8px;
  border-width:1.5px;
  border-radius:8px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  display: flex;
  flex-direction:column;
  justify-content:end;
  max-width: 450px;
  margin-top:-63px;
  border-width:10px;
  border-style: solid;
  border-color: #FF11FA;
  border-radius:8px;
  flex: 1;
  max-width: 450px;
  max-height: 550px;
  background-color: transparent;
  

 
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const InfoColumnVerticalEnd = styled.div`
  margin-bottom: -8px;
  border-width:0.1px;
  border-style: solid;
  border-color: #FF11FA;
  border-radius:8px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  display: flex;
  
  flex-direction:column;
  align-items:flex-end;
  justify-content:end;
  background:green;
  max-width: 50%;
  flex-basis: 50%;
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;


export const InfoColumnMintingQty = styled.div`
  background:black;
  padding-right:0px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;
export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom:15px;
 

  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
`;

export const ImgWrapper = styled.div`
  background: ${({ BackgroundColor}) => (BackgroundColor ? `${BackgroundColor}` : 'transparent')};
  display: flex;
  margin:${({Margin})=>(Margin ? `${Margin}px` : '0px')};
  margin-left:${({MarginLeft})=>(MarginLeft ? `${MarginLeft}px` : '0px')};
  margin-bottom:${({MarginBottom})=>(MarginBottom ? `${MarginBottom}px` : '0px')};
  margin-top:${({MarginTop})=>(MarginTop ? `${MarginTop}px` : '0px')};
  margin-right:${({MarginRight})=>(MarginRight ? `${MarginRight}px` : '0px')};
  justify-content:${({ JustifyContent}) => (JustifyContent ? `${JustifyContent}` : 'Center')};
  align-items:flex-end;
  z-index: ${({Zindex})=>(Zindex ? `${Zindex}`: '0')};
  position:${({Position})=>(Position?`${Position}` : 'static')};
  width:${({WidthPercentage})=>(WidthPercentage?`${WidthPercentage}` : '100%')};
  height:${({HeightPx})=>(HeightPx?`${HeightPx}px` : 'auto')};
  
  
  
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width:"20px";
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;
export const ImgWraperMargin = styled.div`
  background:black;
  max-width: 700;
  display: flex;
  justify-content: center;
  align-items:flex-end;
`;

export const TopLine = styled.div`

  color: ${({textColor}) => (textColor ? `${textColor}` : 'white')};
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  //margin-bottom: 16px;
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

export const Heading = styled.h1`
  
  padding-left: ${({ paddingLeft}) => (paddingLeft ? `${paddingLeft}px;`: '0px')};
  padding-top:15px;
  padding-bottom:15px;
  font-size: 35px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ textColor}) => (textColor ? `${textColor}` : 'white')};
`;
export const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "number",
  
  // or we can define dynamic ones
  size: props.size || "0.5em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;


export const Subtitle = styled.p`
  //max-width: 440px;
  //margin-bottom: 35px;
  font-size: 18px;
  //line-height: 24px;
  color:black;
`;




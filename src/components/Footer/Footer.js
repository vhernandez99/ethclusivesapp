import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css'
import LogoLetras from '../../images/LogoLetras.png'

function Footer (){
  return (
<footer class="footer">
<div class="l-footer">


</div>
<ul class="r-footer">

</ul>
<div class="b-footer">
<h1>
<img src={LogoLetras} width="200"/></h1>
<p>
All rights reserved by ©Ethclusives 2021 </p>
</div>
</footer>

  );
}

export default Footer;
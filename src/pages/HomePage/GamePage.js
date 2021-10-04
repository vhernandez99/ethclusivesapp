import React from 'react';
import Game from '../../components/Game/Game';
import SimpleNavbar from '../../components/Navbar/SimpleNavbar'

function GamePage(){
    return(
        <>
            <SimpleNavbar></SimpleNavbar>
            <Game></Game>
        </>
    );
}
export default GamePage;

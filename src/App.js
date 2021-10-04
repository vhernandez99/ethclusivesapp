import React, {useEffect, useState, useRef} from 'react';
import GlobalStyle from './globalStyles';
import ScrollToTop from './components/ScrollToTop';
import { Navbar, Footer } from './components';
import Game from './pages/HomePage/GamePage';
import Home from './pages/HomePage/MainPage'
import SimpleNavbar from './components/Navbar/SimpleNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';

function App() {
  return (
    <> 
        <Route exact path="/" component={Game}></Route>
        <Route exact path="/home" component={Home}></Route>
      </>
  );
}
export default App;

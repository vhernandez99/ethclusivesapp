import React, {useEffect, useState, useRef} from 'react';
import GlobalStyle from './globalStyles';
import './App.css'
import Game from './pages/HomePage/GamePage';
import Home from './pages/HomePage/MainPage'
import SimpleNavbar from './components/Navbar/SimpleNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="main"> 
    <Switch>
        <Route exact path="/" component={Game}></Route>
        <Route exact path="/home" component={Home}></Route>
        
    </Switch>
        
      </div>
  );
}
export default App;

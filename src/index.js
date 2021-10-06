import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './components/Game/Game'
import Navbar from './components/Navbar/Navbar'
import store from "./redux/store";
import { Provider } from "react-redux";
import{BrowserRouter} from 'react-router-dom'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

ReactDOM.render(
  
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>,
    document.getElementById("root")
  );

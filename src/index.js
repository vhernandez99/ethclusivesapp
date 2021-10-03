import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navbar from './components/Navbar/Navbar'
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
      <App />
      <Navbar/>
      
    </Provider>,
    document.getElementById("root")
  );

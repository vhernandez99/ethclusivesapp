import React, {useEffect, useState, useRef} from 'react';
import GlobalStyle from './globalStyles';
import ScrollToTop from './components/ScrollToTop';
import { Navbar, Footer } from './components';
import MainPage from './pages/HomePage/Home'
function App() {
  return (
    <> 
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <MainPage/>
      <Footer />
      </>
  );
}
export default App;

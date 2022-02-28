import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from '../pages/404';
import About from '../pages/About';
import Home from '../pages/Home';
import Signup from '../pages/Signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cadastro' element={<Signup />} />
          <Route path='/sobre' element={<About />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

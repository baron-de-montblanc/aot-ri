import React, {useEffect, useRef} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Welcome from './components/Welcome';
import Home from './components/Home';

function App() {

  return (
    <div className='app-container'>
      <Welcome />
      <Home/>
    </div>
  );
}

export default App;

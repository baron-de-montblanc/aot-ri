import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Welcome from './components/Welcome';
import Home from './components/Home';
import { Analytics } from "@vercel/analytics/react";

function App() {

  return (
    <div className='app-container'>
      <Welcome />
      <Home/>
      <Analytics/>
    </div>
  );
}

export default App;

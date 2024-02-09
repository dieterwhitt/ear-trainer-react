//dieter whittingham
//ear trainer
//started on jan 7 2023
//filename index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

//routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Intervals from './pages/Intervals';
import Chords from './pages/Chords';
import ChordProgressions from './pages/ChordProgressions'
import About from './pages/About'
import NoPage from './pages/NoPage';


export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='intervals' element={<Intervals />} />
            <Route path='chords' element={<Chords />} />
            <Route path='chordProgressions' element={<ChordProgressions />} />
            <Route path='about' element={<About />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

ReactDOM.render(<App />, document.getElementById('root'));

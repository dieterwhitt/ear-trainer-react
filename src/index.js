//dieter whittingham
//ear trainer
//started on jan 7 2023
//filename index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';

//routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Intervals from "./pages/Intervals";
import Chords from "./pages/Chords";
import Cadences from "./pages/Cadences"
import About from "./pages/About"
import NoPage from "./pages/NoPage";


export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Intervals" element={<Intervals />} />
            <Route path="Chords" element={<Chords />} />
            <Route path="Cadences" element={<Cadences />} />
            <Route path="About" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
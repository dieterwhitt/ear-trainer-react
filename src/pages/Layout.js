//dieter whittingham
//jan 7 2023
//filename Layout.js

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
    <div>
        <nav>
            <Link to= '/'> Home </Link>
            <Link to= '/intervals'> Intervals </Link>
            <Link to= '/chords'> Chords </Link>
            <Link to= '/chordProgressions'> Chord Progressions </Link>
            <Link to= '/about'> About </Link>
        </nav>  

        <Outlet/>
    </div>
    );
}

export default Layout
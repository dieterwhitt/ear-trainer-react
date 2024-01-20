//dieter whittingham
//jan 7 2023
//filename Layout.js

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
    <div>
        <nav className="flex flex-row items-center gap-8 bg-indigo-400 font-font1 
        text-white text-4xl animate-in slide-in-from-top ease-in-out duration-700 h-12">
            <Link className="hover:text-zinc-300" to='/'>Home </Link>
            <Link className="hover:text-zinc-300" to='/intervals'>Intervals </Link>
            <Link className="hover:text-zinc-300" to='/chords'>Chords </Link>
            <Link className="hover:text-zinc-300" to='/chordProgressions'>Chord Progressions </Link>
            <Link className="hover:text-zinc-300" to='/about'>About</Link>
        </nav>  

        <Outlet/>
    </div>
    );
}

export default Layout
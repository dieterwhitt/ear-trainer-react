//dieter whittingham
//jan 7 2023
//filename Layout.js

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';



const Layout = () => {
    return (
    <div className='bg-slate-100 h-screen'>
        <nav className='flex flex-row items-center gap-8 bg-indigo-400 font-font1 
        text-white text-4xl h-14'>
            <Link className='hover:text-zinc-300 hover:underline' to='/' >Home </Link>
            <Link className='hover:text-zinc-300 hover:underline' to='/intervals' >Intervals </Link>
            <Link className='hover:text-zinc-300 hover:underline' to='/chords'>Chords </Link>
            <Link className='hover:text-zinc-300 hover:underline' to='/chordProgressions'>Chord Progressions </Link>
            <Link className='hover:text-zinc-300 hover:underline' to='/about'>About</Link>
        </nav>  

        <Outlet/>
    </div>
    );
}

export default Layout
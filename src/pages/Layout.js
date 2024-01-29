//dieter whittingham
//jan 7 2023
//filename Layout.js

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';



const Layout = () => {
    return (
    <div className='bg-slate-100 h-screen'>
        <nav className='flex flex-row items-center gap-[3%]
        bg-indigo-300 font-font1 text-white text-5xl h-[9%]
        px-[1.7%]'>
            <Link className='hover:text-zinc-300'
            to='/' >Home </Link>
            <Link className='hover:text-zinc-300' 
            to='/intervals' >Intervals </Link>
            <Link className='hover:text-zinc-300'  
            to='/chords'>Chords </Link>
            <Link className='hover:text-zinc-300' 
            to='/chordProgressions'>Chord Progressions </Link>
            <Link className='hover:text-zinc-300' 
            to='/about'>About</Link>
        </nav>  

        <Outlet/>
    </div>
    );
}

export default Layout
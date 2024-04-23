//dieter whittingham
//jan 7 2024
//filename Layout.js

import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    const linkStyle = "hover:text-zinc-300";
    const navBarStyle =
        "flex flex-row items-center gap-[3%] bg-indigo-300 " +
        "font-font1 font-light text-white text-5xl px-[1.7%] py-[0.8%]";
    const webPageStyle = "bg-slate-100 min-h-screen font-font1 text-center";
    return (
        <div className={webPageStyle}>
            <nav className={navBarStyle}>
                <Link className={linkStyle} to="/">
                    Home{" "}
                </Link>
                <Link className={linkStyle} to="/intervals">
                    Intervals{" "}
                </Link>
                <Link className={linkStyle} to="/chords">
                    Chords{" "}
                </Link>
                <Link className={linkStyle} to="/chordprogressions">
                    Chord Progressions{" "}
                </Link>
                <Link className={linkStyle} to="/about">
                    About
                </Link>
            </nav>

            <Outlet />
        </div>
    );
};

export default Layout;

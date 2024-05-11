// dieter whittingham
// may 6 2024
// NavBar.js

// navigation bar

import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

function NavBar() {
    // current links
    const links = [
        { name: "Home", link: "/" },
        { name: "Intervals", link: "/intervals" },
        { name: "Chords", link: "/chords" },
        { name: "Chord Progressions", link: "/chordprogressions" },
        { name: "About", link: "/about" },
    ];
    if (!isMobile) {
        return (
            <nav
                className="flex flex-row items-center gap-[3%] bg-indigo-300 
            font-font1 font-light text-white text-5xl px-[1.7%] py-[0.8%]"
            >
                {links.map((value) => {
                    return (
                        <Link className="hover:text-zinc-300" to={value.link}>
                            {value.name}
                        </Link>
                    );
                })}
            </nav>
        );
    } else {
        return <div></div>;
    }
}

export default NavBar;

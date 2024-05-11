//dieter whittingham
//jan 7 2024
//filename About.js

import React from "react";

import github from "../images/github.png";
import linkedin from "../images/linkedin.png";
import email from "../images/email.png";
import leetcode from "../images/leetcode.png";

import Title from "../components/Title";
import Header from "../components/Header";

/**
 * icon array flex row
 * @param props.scale image scale
 */
function Icons(props) {
    const iconArray = [
        {
            src: email,
            alt: "email icon",
            href: "mailto:whittinghamdieter@gmail.com",
        },
        {
            src: github,
            alt: "github icon",
            href: "https://github.com/dieterwhitt",
        },
        {
            src: leetcode,
            alt: "leetcode icon",
            href: "https://leetcode.com/dieterwhittingham/",
        },
        {
            src: linkedin,
            alt: "linkedin icon",
            href: "https://linkedin.com/in/dieterwhittingham",
        },
    ];
    // map each icon to clickable image
    return (
        <div className="flex flex-row justify-center items-center">
            {iconArray.map((icon) => {
                return (
                    <div>
                        <a href={icon.href} target="_blank">
                            <img
                                src={icon.src}
                                alt={icon.alt}
                                className="scale-75"
                            />
                        </a>
                    </div>
                );
            })}
        </div>
    );
}

function About() {
    return (
        <div className="font-font1 text-center">
            <Title text="About eartrainer.net" />
            <Header
                text="I created this web application to help musicians 
                improve their aural skills."
            />
            <p
                className="text-2xl font-normal animate-in fade-in 
                slide-in-from-bottom-[5%] ease-in-out duration-1000 mx-[7%]
                leading-relaxed"
            >
                At the time of writing, I'm currently a first year computer
                science student at the University of Waterloo in Waterloo,
                Ontario. I designed this website based on my own experiences as
                a piano player. I began playing piano at age five and graduated
                from the Royal Conservatory of Music with an ARCT diploma in
                2021, studying under Wilson Man at the Wandering Minstrel Music
                School in Missisauga, Ontario. As a piano student, I found it
                hard to practice necessary ear training skills alone. I also saw
                that there were very few resources online to do so and some of
                them cost money! I used my knowledge of music theory and web
                development to help give musicians a chance to have free and
                unlimited ear training practice. If you'd like to learn more
                about this project, I will be featuring a video demonstration in
                the near future. Thank you for using eartrainer.net!
                <br />
                <br />
                -Dieter Whittingham, April 2024
                <Icons />
            </p>
        </div>
    );
}

export default About;

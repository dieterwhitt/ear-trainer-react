//dieter whittingham
//jan 7 2023
//filename About.js

import React from 'react';

import github from '../images/github.png'
import linkedin from '../images/linkedin.png'
import email from '../images/email.png'

const About = () => {
    return (
        <div className='font-font1 text-center'>
            <h1 className='
            text-6xl my-[3%] font-bold animate-in fade-in
            slide-in-from-top ease-in-out duration-1000'>
                About eartrainer.net</h1>
            <h2 className='text-3xl mb-[2.5%] font-semibold animate-in fade-in 
        slide-in-from-top-[70%] ease-in-out duration-1000 mx-[4%]'>I created this web application to help
                musicians improve their aural skills.</h2>
            <p className='text-2xl font-semibold animate-in fade-in 
        slide-in-from-bottom-[5%] ease-in-out duration-1000 mx-[6%]
        leading-relaxed'>At the time of writing, I'm currently a first year 
                computer science student at the University of Waterloo in Waterloo, Ontario.
                I designed this website based on my own experiences as a piano player.
                I began playing piano at age five and graduated from the Royal Conservatory
                of Music with an ARCT diploma in 2021, studying under Wilson Man at the Wandering Minstrel
                Music School in Missisauga, Ontario. As a piano student, I found it hard to practice necessary ear
                training skills alone. I also saw that there were very few resources
                online to do so and some of them cost money! I used my knowledge of music
                theory and web development to help give musicians a chance to have 
                free and unlimited ear training practice. If you'd like to learn more
                about this project, I will be featuring a video 
                demonstration in the near future. Thank you for using eartrainer.net! 
                <br/>
                <br/>
                -Dieter Whittingham, April 2024
                <div className='flex flex-row justify-center items-center'>
                    <a href='mailto:whittinghamdieter@gmail.com' >
                        <img src={email} alt='email icon'/>
                    </a>
                    <a href='https://github.com/dieterwhitt' target='_blank'>
                        <img src={github} alt='github icon'/>
                    </a>
                    <a href='https://linkedin.com/in/dieterwhittingham' target='_blank'>
                        <img src={linkedin} alt='linkedin icon'/>
                    </a>
                </div>
            </p>
        </div>
    );
}

export default About;
//dieter whittingham
//jan 7 2023
//filename About.js

import React from 'react';

const About = () => {
    return (
        <div>
            <h1>About Ear Trainer</h1>
            <h2>Hi, I'm Dieter Whittingham.<br/> I created this web application to help
                musicians (like you!) improve their aural skills.</h2>
            <p>Some more about me: At the time of writing, I'm currently a first year 
                computer science student at the University of Waterloo in Waterloo, Ontario.
                I designed this website based on my own experiences as a piano player.
                I began playing piano at age five and graduated from the Royal Conservatory
                of Music with an ARCT diploma in 2021, studying under Wilson Man at the Wandering Minstrel
                Music School in Missisauga, Ontario. As a piano student, I found it hard to practice necessary ear
                training skills alone. I also saw that there were very few resources
                online to do so and some of them cost money! I used my knowledge of music
                theory and web development to help give musicians a chance to have 
                unlimited and free ear training practice. If you'd like to see more about
                how the backend code works in this project, I will be featuring a video 
                demonstration of the project in the near future. Thank you for using eartrainer.net! 
                <br/>
                -Dieter Whittingham, January 2024
            </p>
            <div>
                <h4>Contact me:</h4>  
                <nav>
                    <div>email: dieter.whitt@gmail.com</div>
                    <a href='https://github.com/dieterwhitt' target='_blank'>
                        github.com/dieterwhitt</a>
                    <br/>
                    <a href='https://linkedin.com/in/dieterwhittingham' target='_blank'>
                        linkedin.com/in/dieterwhittingham</a>
                </nav>
            </div>
        </div>
    );
}

export default About;
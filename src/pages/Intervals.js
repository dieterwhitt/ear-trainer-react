//dieter whittingham
//jan 7 2023
//filename Intervals.js

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { getStars, playInterval} from '../keyboard';

import Select from 'react-select';

function Title(){
    return(
        <h1 className='
            text-6xl my-[3%] font-normal animate-in fade-in
            slide-in-from-top ease-in-out duration-1000'>Interval Training</h1>
    );
}

//header component
function Header(){
    return (
        <div className='text-3xl mb-[2.5%] font-normal animate-in fade-in 
        slide-in-from-top-[40%] ease-in-out duration-1000 mx-[4%]'>
            <p>
            Welcome to interval identification. 
            When you press play, you will be given
            a series of random intervals. Identify them using the drop down box.
            </p>    
            <p className='text-2xl animate-in fade-in 
        slide-in-from-top ease-in-out duration-700 mt-[1.5%]'>
                All intervals up to and including a Major Ninth are possible.
                <br/>(Difficulty options coming soon!)
            </p>
        </div>
        );
}

// will need to refactor to allow difficulty selection
const options = [
    {value: 0, label: 'Perfect Unison'},
    {value: 1, label: 'Minor Second'},
    {value: 2, label: 'Major Second'},
    {value: 3, label: 'Minor Third'},
    {value: 4, label: 'Major Third'},
    {value: 5, label: 'Perfect Fourth'},
    {value: 6, label: 'Tritone'},
    {value: 7, label: 'Perfect Fifth'},
    {value: 8, label: 'Minor Sixth'},
    {value: 9, label: 'Major Sixth'},
    {value: 10, label: 'Minor Seventh'},
    {value: 11, label: 'Major Seventh'},
    {value: 12, label: 'Perfect Octave'},
    {value: 13, label: 'Minor Ninth'},
    {value: 14, label: 'Major Ninth'}
];

const defaultOption = {value: -1, label: 'Choose Interval'};

//game interface component
function GameInterface(){
    
    //state: number of plays completed
    const [playsCompleted, setPlaysCompleted] = useState(0);
    //state: current answer array
    const [answerSheet, setAnswerSheet] = useState([]);
    //state: user answer array
    const [userAnswers, setUserAnswers] = useState([]);
    const [resultUpdate, setResultUpdate] = useState(false);
    
    //first render of the game
    const [firstRender, setFirstRender] = useState(true);

    //setting the intial rounds per game to 10
    const [roundsPerGame, setRoundsPerGame] = useState(10);

    // using usestate instead of getdocument like a retard
    const [playButtonEnabled, setPlayButtonEnabled] = useState(true);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [dropdownEnabled, setDropdownEnabled] = useState(true);
    const [dropdownOption, setDropdownOption] = useState(defaultOption);
    
    
    const restartGame = () => {
        if (!firstRender){
            //reenable button
            setPlayButtonEnabled(true);
            //redisable submit button
            setSubmitButtonEnabled(false);
            //reset dropdown
            setDropdownEnabled(true);
            //remove results
            setResultUpdate(false);
            //reset score
            setAnswerSheet([]);
            setUserAnswers([]);
            setPlaysCompleted(0);
        }
    }

    //handles user submitting
    const handleSubmit = (event) => {
        event.preventDefault();
        //get user input (interval number)
        const currentInput = dropdownOption.value;
        //check valid input
        if(currentInput == -1){
            alert('Please select an interval.');
        }else{
            //update number of rounds played
            const newPlaysCompleted = playsCompleted + 1;
            setPlaysCompleted(newPlaysCompleted);
            
            //reset dropdown
            setDropdownOption(defaultOption);
            //log
            console.log('user submitted ' + currentInput);
            console.log(newPlaysCompleted + ' plays completed');

            //reenable button
            setPlayButtonEnabled(true);
            //redisable submit button
            setSubmitButtonEnabled(false);
            //update user answer sheet
            setUserAnswers(prevAnswers => [...prevAnswers, currentInput]);
            //check if the game is finished:
            if(newPlaysCompleted >= roundsPerGame){
                //just submitted final round
                //update gamestate so results render
                console.log('setting result update status to true');
                setResultUpdate(true); 
            }
        }   
    }     
    
    //handles user pressing the play button
    //play sound, and log the correct answer to the answersheet
    const handlePlay = (event) =>{
        event.preventDefault();
        //play interval and get the numerical value for it.
        const currentAnswer = playInterval();
        console.log('the correct answer is ' + currentAnswer);
        //disable the button so that it cant be used before submission
        setPlayButtonEnabled(false);
        //enable the submit button
        setSubmitButtonEnabled(true);
        //add current answer to answersheet
        setAnswerSheet(prevAnswerSheet => [...prevAnswerSheet, currentAnswer]);
    }

    function FirstRenderPlay() {
        return (
        <div className='animate-in fade-in 
                slide-in-from-bottom-[50%] ease-in-out duration-1000'>
            <button className='text-5xl font-normal my-[2%] outline rounded-full
            outline-indigo-400 h-fit outline-2 outline-offset-2 py-[1.5%] 
            px-[3%] bg-indigo-200 hover:bg-indigo-300 hover:scale-110 
            duration-300 '
                onClick={() => {restartGame(); setFirstRender(false)}}>Play 🎵
            </button>
        </div>);
    }

    function PlayButton() {
        var colorStr = '';
        if (playButtonEnabled) {
            colorStr = 'bg-indigo-200 outline-indigo-400 hover:bg-indigo-300 ' 
                    + 'hover:scale-110 duration-300';
        } else {
            colorStr = 'bg-gray-300 outline-gray-400';
        }
        return (<button id='gameButton' onClick={handlePlay}
        className={'text-3xl font-normal my-[10%] outline rounded-full '
        + 'h-fit outline-2 outline-offset-2 py-[6%] px-[12%] ' 
        + colorStr} disabled={!playButtonEnabled}>
            Play Interval</button>);
    }

    function Dropdown() {
        var colorStr = '';
        if (dropdownEnabled) {
            colorStr = 'bg-indigo-200 outline-indigo-400 hover:bg-indigo-300 ' 
                    + 'hover:scale-110 duration-300';
        } else {
            colorStr = 'bg-gray-300 outline-gray-400';
        }
        return (
            <Select options={options} onChange={setDropdownOption} disabled={!dropdownEnabled} 
                value={dropdownOption} unstyled isSearchable={false}
                classNames={{
                    container: () => 'text-3xl font-normal my-[10%] outline rounded-full '
                    + 'h-fit outline-2 outline-offset-2 py-[6%] w-[100%] ' 
                    + colorStr,
                    option: () => 'font-thin bg-slate-50 hover:text-indigo-300 ',
                }}/>
        );
    }

    function SubmitButton() {
        var colorStr = '';
        if (submitButtonEnabled) {
            colorStr = 'bg-indigo-200 outline-indigo-400 hover:bg-indigo-300 ' 
                    + 'hover:scale-110 duration-300';
        } else {
            colorStr = 'bg-gray-300 outline-gray-400';
        }
        return(
            <button disabled={!submitButtonEnabled} id='submitButton' 
                onClick={handleSubmit} className={'text-3xl font-normal my-[10%] '
                + 'outline rounded-full '
                + 'h-fit outline-2 outline-offset-2 py-[6%] px-[12%] ' 
                + colorStr}>Submit</button>
        );
    }

    function LoadResults(){
        // fix this atrocious code please !
        if (!resultUpdate){
            //not ready to load
            return (
                <div>
                    <h2 className='text-4xl my-[1.5%] font-normal mx-[4%]'>
                        Intervals Remaining: {roundsPerGame - playsCompleted}</h2>
                    <h3 className='text-2xl my-[1.5%] font-normal mx-[4%]'>
                        Finish the current session to see your results.</h3>
                    {/*button that reloads the page*/}
                        <button className='text-3xl font-normal my-[1%] outline 
                        rounded-full h-fit outline-2 outline-offset-2 py-[1%] px-[2%] 
                        mx-[2%] bg-indigo-200 outline-indigo-400 hover:bg-indigo-300
                        hover:scale-110 duration-300'
                        onClick={() => {restartGame(); setFirstRender(true)}}>Start Over</button>   
                </div>
            
            )
        }else{
            let correct = 0;
            for (const index in answerSheet) {
                //getting score
                //== since they're 2 different arrays in memory
                if (answerSheet[index] == userAnswers[index]){
                    //correct answer
                    correct ++;
                }
            }
            //get rounded percentage score
            const percentage = Math.round(100*correct/roundsPerGame);
            const stars = getStars(percentage);
            //disable play buttons so they can see their results
            setPlayButtonEnabled(false);
            setDropdownEnabled(false);
            //render
            return(
                <div className='animate-in fade-in duration-1000 ease-in-out'>
                    <h3 className='text-5xl py-[1.5%] font-normal mx-[4%] ease-in-out
                    animate-in slide-in-from-bottom-[70%] duration-1000'>Results ✏️</h3>
                    <h1 className='text-7xl py-[1%] font-normal mx-[4%]ease-in-out
                    animate-in slide-in-from-bottom-[100%] duration-1000'>{stars}</h1>
                    <p className='text-3xl py-[1%] font-normal mx-[4%]ease-in-out
                    animate-in slide-in-from-bottom-[60%] duration-1000'>
                        Score: {correct}/{roundsPerGame} ({percentage}%)</p>
                    <div className='animate-in slide-in-from-bottom-[40%] duration-1000 ease-in-out'>
                        <button id='restartButton' onClick={restartGame} 
                        className='text-3xl font-normal py-[1%] my-[1%] outline 
                        rounded-full h-fit outline-2 outline-offset-2 px-[2%] 
                        mx-[2%] bg-indigo-200 outline-indigo-400 hover:bg-indigo-300
                        hover:scale-110 duration-300'>Play Again</button>
                    </div>
                    
                </div>
                )}
    }

    //returning
    if(firstRender){
        return(
            <div>
                <Title/>
                <Header/>
                <FirstRenderPlay/>
            </div>
        );       
    }else{
        // empty div required to reanimate title
        return (
            <div>
                <></>
                <Title/>
                <div className='flex flex-row justify-center gap-[4.5%] py-[1%]
                        animate-in fade-in slide-in-from-bottom-24 
                        ease-in-out duration-1000'>
                    {/* play button */}
                    <div className='flex justify-end w-[18%]'>
                        <PlayButton/>
                    </div>
                    <div className='flex justify-center w-[18%]'>
                        <Dropdown/>
                    </div>
                    <div className='flex justify-start w-[18%]'>
                        <SubmitButton/>
                    </div>
                    
                </div>
                <div className='animate-in fade-in slide-in-from-bottom-12 
                        ease-in-out duration-1000'>
                    <LoadResults />
                </div>
                
            </div>);
    }
}

//main component
const Intervals = () => {
    return(
    <div className='font-font1 text-center'>
        <GameInterface />
    </div>
    )
}

export default Intervals;
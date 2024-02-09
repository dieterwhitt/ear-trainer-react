//dieter whittingham
//jan 7 2023
//filename Intervals.js

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { getStars, playInterval} from '../keyboard';


//header component
function Header(){
    return (
        <div>
            <h1>Interval Training</h1>
            <p className='text-lg font-bold'>Welcome to interval training. 
                When you press play, you will be given
                a series of random intervals. Identify them using the drop down box.
                <br/> All intervals up to and including a Major Ninth are possible.
            </p>    
        </div>
        );
}

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

    function LoadResults(){
        if (!resultUpdate){
            //not ready to load
            return (
                <div>
                    <h3>Finish the current session to see your results.</h3>
                    {/*button that reloads the page*/}
                    <button onClick={() => window.location.reload(false)}>Start Over</button>
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
            document.getElementById('gameButton').disabled = true;
            document.getElementById('intervalDropdown').disabled = true;
            //render
            return(
                <>
                    <h3>Results:</h3>
                    <h1>{stars}</h1>
                    <p>Score: {correct}/{roundsPerGame} ({percentage}%)</p>
                    <button id='restartButton' onClick={restartGame}>Play Again</button>
                </>
                )}
    }

    const restartGame = () => {
        if (!firstRender){
            //doesn't apply when user presses the PLAY! button
            //in that case, the conditional rendering will load the default settings
            //function for resetting the game
            //reenable button
            document.getElementById('gameButton').disabled = false;
            //redisable submit button
            document.getElementById('submitButton').disabled = true;
            //reset dropdown
            document.getElementById('intervalDropdown').disabled = false;
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
        const currentInput = document.getElementById('intervalDropdown').value;
        //check valid input
        if(currentInput === -1){
            alert('Please select an interval.');
        }else{
            //update number of rounds played
            const newPlaysCompleted = playsCompleted + 1;
            setPlaysCompleted(newPlaysCompleted);
            
            //reset dropdown
            document.getElementById('intervalDropdown').selectedIndex = 0;
            //log
            console.log('user submitted ' + currentInput);
            console.log(newPlaysCompleted + ' plays completed');

            //reenable button
            document.getElementById('gameButton').disabled = false;
            //redisable submit button
            document.getElementById('submitButton').disabled = true;
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
        document.getElementById('gameButton').disabled = true;
        //enable the submit button
        document.getElementById('submitButton').disabled = false;
        //add current answer to answersheet
        setAnswerSheet(prevAnswerSheet => [...prevAnswerSheet, currentAnswer]);
    }
    //returning
    if(firstRender){
        return(
            <div>
                <button
                    onClick={() => {restartGame(); setFirstRender(false)}}>PLAY!
                </button>
            </div>
        )
    }else{
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    {/* play button */}
                    <button id='gameButton' onClick={handlePlay}>Play Interval</button>
        
                    <select id='intervalDropdown'>
                        {/* dropdown */}
                        <option selected disabled hidden value={-1}>Choose Interval</option>
                        <option value={0}>Perfect Unison</option>
                        <option value={1}>Minor Second</option>
                        <option value={2}>Major Second</option>
                        <option value={3}>Minor Third</option>
                        <option value={4}>Major Third</option>
                        <option value={5}>Perfect Fourth</option>
                        <option value={6}>Tritone</option>
                        <option value={7}>Perfect Fifth</option>
                        <option value={8}>Minor Sixth</option>
                        <option value={9}>Major Sixth</option>
                        <option value={10}>Minor Seventh</option>
                        <option value={11}>Major Seventh</option>
                        <option value={12}>Perfect Octave</option>
                        <option value={13}>Minor Ninth</option>
                        <option value={14}>Major Ninth</option>
                    </select>
                    {/* submit button: disabled until interval is played*/}
                    <input disabled id='submitButton' type='submit' />
                </form>
                <h2>Intervals Remaining: {roundsPerGame - playsCompleted}</h2>
                <LoadResults/>
            </div>);
    }
}

//main component
const Intervals = () => {
    return(
    <>
        <Header />
        <GameInterface />
    </>
    )
}

export default Intervals;
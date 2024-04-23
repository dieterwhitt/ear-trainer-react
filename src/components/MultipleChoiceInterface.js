// dieter whittingham
// april 22 2024
// multiple choice game interface

import React from "react";
import { useState } from "react";
import { getStars } from "../logic/keyboard";
import Title from "../components/Title";
import Header from "../components/Header";
import Subheader from "../components/Subheader";
import GenericButton1 from "../components/GenericButton1";

import Select from "react-select";

// using for intervals, chords, any game with multiple choice answers

// game title
function GameTitle(props) {
    return <Title text={`${props.keyword} Training`} />;
}

// game header
function GameHeader(props) {
    return (
        <div>
            <Header text={props.header} />
            <Subheader text={props.subheader} />
        </div>
    );
}

/**
 * multiple choice game interface
 * @param props.options array of multiple choice options
 * @param props.default_option default option
 * @param props.play_function specific play function
 * @param keyword game keyword (ex. interval -> play interval, choose interval)
 * @param title title text
 * @param props.header page header
 * @param props.subheader page subheader
 */
function MultipleChoiceInterface(props) {
    //state: number of plays completed
    const [playsCompleted, setPlaysCompleted] = useState(0);
    //state: current answer array
    const [answerSheet, setAnswerSheet] = useState([]);
    //state: user answer array
    const [userAnswers, setUserAnswers] = useState([]);
    const [resultUpdate, setResultUpdate] = useState(false);

    //first render of the game
    const [firstRender, setFirstRender] = useState(true);

    //setting the intial rounds per game to 10 (will refactor)
    const [roundsPerGame, setRoundsPerGame] = useState(10);

    // using usestate instead of getdocument like a retard
    const [playButtonEnabled, setPlayButtonEnabled] = useState(true);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [dropdownEnabled, setDropdownEnabled] = useState(true);
    const [dropdownOption, setDropdownOption] = useState(props.default_option);

    const restartGame = () => {
        if (!firstRender) {
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
    };

    //handles user submitting
    const handleSubmit = (event) => {
        event.preventDefault();
        //get user input (option number)
        const currentInput = dropdownOption.value;
        //check valid input
        if (currentInput == -1) {
            alert("Please select an option.");
        } else {
            //update number of rounds played
            const newPlaysCompleted = playsCompleted + 1;
            setPlaysCompleted(newPlaysCompleted);

            //reset dropdown
            setDropdownOption(props.default_option);
            //log
            console.log("user submitted " + currentInput);
            console.log(newPlaysCompleted + " plays completed");

            //reenable button
            setPlayButtonEnabled(true);
            //redisable submit button
            setSubmitButtonEnabled(false);
            //update user answer sheet
            setUserAnswers((prevAnswers) => [...prevAnswers, currentInput]);
            //check if the game is finished:
            if (newPlaysCompleted >= roundsPerGame) {
                //just submitted final round
                //update gamestate so results render
                console.log("setting result update status to true");
                setResultUpdate(true);
            }
        }
    };

    //handles user pressing the play button
    //play sound, and log the correct answer to the answersheet
    const handlePlay = (event) => {
        event.preventDefault();
        //play option and get the numerical value for it.
        const currentAnswer = props.play_function();
        console.log("the correct answer is " + currentAnswer);
        //disable the button so that it cant be used before submission
        setPlayButtonEnabled(false);
        //enable the submit button
        setSubmitButtonEnabled(true);
        //add current answer to answersheet
        setAnswerSheet((prevAnswerSheet) => [
            ...prevAnswerSheet,
            currentAnswer,
        ]);
    };

    // play button for the first render
    function FirstRenderPlay() {
        return (
            <div
                className="animate-in fade-in text-5xl my-[5%]
                slide-in-from-bottom-[50%] ease-in-out duration-1000"
            >
                <GenericButton1
                    text="Play 🎵"
                    enabled={true}
                    onClick={() => {
                        restartGame();
                        setFirstRender(false);
                    }}
                    size="5xl"
                />
            </div>
        );
    }

    // button to play a multiple choice option
    function PlayButton() {
        return (
            <GenericButton1
                text={`Play ${props.keyword}`}
                enabled={playButtonEnabled}
                onClick={handlePlay}
                py={6}
                px={12}
            />
        );
    }

    // dropdown button to display answers using react select
    function Dropdown() {
        var colorStr = "";
        if (dropdownEnabled) {
            colorStr =
                "bg-indigo-200 outline-indigo-400 hover:bg-indigo-300 " +
                "hover:scale-110 duration-300";
        } else {
            colorStr = "bg-gray-300 outline-gray-400";
        }
        return (
            <Select
                options={props.options}
                onChange={setDropdownOption}
                disabled={!dropdownEnabled}
                value={dropdownOption}
                unstyled
                isSearchable={false}
                classNames={{
                    container: () =>
                        "text-3xl font-normal outline rounded-full " +
                        "h-fit outline-2 outline-offset-2 py-[6%] w-[100%] " +
                        colorStr,
                    option: () =>
                        "font-thin bg-slate-50 hover:text-indigo-300 ",
                }}
            />
        );
    }

    function SubmitButton() {
        return (
            <GenericButton1
                text="Next"
                enabled={submitButtonEnabled}
                onClick={handleSubmit}
                py={6}
                px={12}
            />
        );
    }

    function LoadResults() {
        // fix this atrocious code please !
        if (!resultUpdate) {
            //not ready to load
            return (
                <div>
                    <h2 className="text-4xl my-[1.5%] font-normal mx-[4%]">
                        {props.keyword}s Remaining:{" "}
                        {roundsPerGame - playsCompleted}
                    </h2>
                    <h3 className="text-2xl my-[1.5%] font-normal mx-[4%]">
                        Finish the current session to see your results.
                    </h3>
                    {/*button that reloads the page*/}
                    <GenericButton1
                        text="Start Over"
                        enabled={true}
                        onClick={() => {
                            restartGame();
                            setFirstRender(true);
                        }}
                        py={1}
                        px={2}
                    />
                </div>
            );
        } else {
            let correct = 0;
            for (const index in answerSheet) {
                //getting score
                //== since they're 2 different arrays in memory
                if (answerSheet[index] == userAnswers[index]) {
                    //correct answer
                    correct++;
                }
            }
            //get rounded percentage score
            const percentage = Math.round((100 * correct) / roundsPerGame);
            const stars = getStars(percentage);
            //disable play buttons so they can see their results
            setPlayButtonEnabled(false);
            setDropdownEnabled(false);
            //render
            return (
                <div className="animate-in fade-in duration-1000 ease-in-out">
                    <h3
                        className="text-5xl py-[1.5%] font-normal mx-[4%] ease-in-out
                    animate-in slide-in-from-bottom-[70%] duration-1000"
                    >
                        Results ✏️
                    </h3>
                    <h1
                        className="text-7xl py-[1%] font-normal mx-[4%]ease-in-out
                    animate-in slide-in-from-bottom-[100%] duration-1000"
                    >
                        {stars}
                    </h1>
                    <p
                        className="text-3xl py-[1%] font-normal mx-[4%]ease-in-out
                    animate-in slide-in-from-bottom-[60%] duration-1000"
                    >
                        Score: {correct}/{roundsPerGame} ({percentage}%)
                    </p>
                    <div
                        className="animate-in slide-in-from-bottom-[40%]
                         duration-1000 ease-in-out"
                    >
                        <GenericButton1
                            text="Play Again"
                            enabled={true}
                            onClick={restartGame}
                            py={1}
                            px={2}
                        />
                    </div>
                </div>
            );
        }
    }

    //returning
    if (firstRender) {
        return (
            <div>
                <GameTitle keyword={props.title} />
                <GameHeader header={props.header} subheader={props.subheader} />
                <FirstRenderPlay />
            </div>
        );
    } else {
        // empty div required to reanimate title on restart
        return (
            <div>
                <div>
                    <GameTitle keyword={props.title} />
                </div>

                <div
                    className="flex flex-row justify-center gap-[4.5%] py-[1%]
                        animate-in fade-in slide-in-from-bottom-24 
                        ease-in-out duration-1000"
                >
                    {/* play button */}
                    <div className="flex justify-end w-[18%]">
                        <PlayButton />
                    </div>
                    <div className="flex justify-center w-[18%]">
                        <Dropdown />
                    </div>
                    <div className="flex justify-start w-[18%]">
                        <SubmitButton />
                    </div>
                </div>
                <div
                    className="animate-in fade-in slide-in-from-bottom-12 
                        ease-in-out duration-1000"
                >
                    <LoadResults />
                </div>
            </div>
        );
    }
}

export default MultipleChoiceInterface;

// dieter whittingham
// april 22 2024
// MultipleChoiceInterface.js

// multiple choice game interface

import React from "react";
import { useState } from "react";
import { getStars } from "../logic/feedback";
import Title from "../components/Title";
import Header from "../components/Header";
import Subheader from "../components/Subheader";
import GenericButton1 from "../components/GenericButton1";
import MCSettingInterface from "./MCSettingInterface";

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

// play button for the first render
// moving outside (for now)
function FirstRenderPlay(props) {
    return (
        <div
            className="animate-in fade-in text-5xl py-[5%]
            slide-in-from-bottom-[20%] ease-in-out duration-1000"
        >
            <GenericButton1
                text="Play 🎵"
                enabled={true}
                onClick={props.onClick}
                size="5xl"
            />
        </div>
    );
}

/**
 * multiple choice game interface
 * @param props.defaultOption default option
 * @callback props.playFunction specific play function
 * @param keyword game keyword (ex. interval -> play interval, choose interval)
 * @param title title text
 * @param props.header page header
 * @param props.subheader page subheader
 * @param props.defaultSettings default settings
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

    //setting the intial rounds per game to 10
    const [roundsPerGame, setRoundsPerGame] = useState(10);

    // using usestate instead of getdocument like a retard
    const [playButtonEnabled, setPlayButtonEnabled] = useState(true);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [dropdownEnabled, setDropdownEnabled] = useState(true);
    const [dropdownOption, setDropdownOption] = useState(props.defaultOption);

    // new - settings
    // see MCSettingInterface.js for setting object documentation
    const [settings, setSettings] = useState(props.defaultSettings);
    // dropdown values
    const [answers, setAnswers] = useState([]);

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
        if (currentInput === -1) {
            alert("Please select an option.");
        } else {
            //update number of rounds played
            const newPlaysCompleted = playsCompleted + 1;
            setPlaysCompleted(newPlaysCompleted);

            //reset dropdown
            setDropdownOption(props.defaultOption);
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
        const currentAnswer = props.playFunction(settings);
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

    const verifySettings = () => {
        // check that settings are valid before starting the game
    };

    const updateSettings = () => {
        // update options and rounds per game
        console.log(settings.rounds.value);
        setRoundsPerGame(settings.rounds.value);
        console.log(`set rounds per game`);
        // need to set the dropdown answers
        // check all settings that are "ans", and create a new option
        // with the value equaling the id of the setting
        const newAnswers = [];
        for (var option in settings) {
            // answer type setting and is enabled
            if (settings[option].type === "ans" && settings[option].value) {
                newAnswers.push({ value: settings[option].id, label: option });
            }
        }

        setAnswers(newAnswers);
    };

    // button to play a multiple choice option
    function PlayButton() {
        return (
            <GenericButton1
                text={`Play ${props.keyword}`}
                enabled={playButtonEnabled}
                onClick={handlePlay}
                buttonSize={3}
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
                options={answers}
                onChange={setDropdownOption}
                disabled={!dropdownEnabled}
                value={dropdownOption}
                unstyled
                isSearchable={false}
                classNames={{
                    container: () =>
                        "font-normal outline rounded-full " +
                        "h-fit outline-2 outline-offset-2 py-[6%] w-[100%] " +
                        colorStr,
                    control: () => "text-3xl",
                    option: () =>
                        "font-light bg-slate-50 hover:text-indigo-300 scale-y-105",
                    menu: () => "text-3xl transform-none border-8 rounded",
                    dropdownIndicator: () => "text-transparent",
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
                buttonSize={3}
            />
        );
    }

    function LoadResults() {
        // fix this atrocious code please !
        if (!resultUpdate) {
            //not ready to load
            return (
                <div>
                    <h2 className="text-4xl my-[1.5%] font-normal">
                        {props.keyword}s Remaining:{" "}
                        {roundsPerGame - playsCompleted}
                    </h2>
                    <h3 className="text-2xl my-[1.5%] font-normal">
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
                        buttonSize={1}
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
                         duration-1000 ease-in-out my-[1%]"
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

                <MCSettingInterface
                    settings={settings}
                    updateSettings={setSettings}
                />
                <FirstRenderPlay
                    onClick={() => {
                        updateSettings();
                        restartGame();
                        setFirstRender(false);
                    }}
                />
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
                    <div className="flex justify-end w-[22%]">
                        <PlayButton />
                    </div>
                    <div className="flex justify-center w-[22%]">
                        <Dropdown />
                    </div>
                    <div className="flex justify-start w-[22%]">
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

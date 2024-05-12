// dieter whittingham
// may 7 2024
// settings.js

// idea:
// an Option: {type: (answer, true/false, number), value, group}
// answer is a special true/false that is also a mc answer
// a group must have at least 1 t/f to be valid (answer counts as t/f)

// Settings: an object of
// {
//    option1: Option
//    option2: Option
//}

// where option (option1, option2...) is the name of the option

// this is why i hate javascript

import React from "react";
import ToggleButton1 from "./ToggleButton1";
import NumberButton1 from "./NumberButton1";

function MCSettingInterface({ settings, updateSettings }) {
    // function to update the settings given an Option and a new value
    function updateOption(option, value) {
        console.log("option updating");
        console.log(`${option} -> ${value}`);
        // updates the Option with the name option to have the value value
        const newSettings = { ...settings };
        newSettings[option].value = value;
        console.log(newSettings);
        updateSettings(newSettings);
    }

    function OptionInput(option) {
        var setting = settings[option];
        console.log(setting);
        // given an option, renders either a check box or a number based on type
        if (setting.type === "ans" || setting.type === "t/f") {
            // render checkbox
            return (
                <ToggleButton1
                    text={option}
                    on={setting.value}
                    onClick={() =>
                        updateOption(option, !settings[option].value)
                    }
                />
            );
        } else if (setting.type === "num") {
            return (
                <div>
                    <NumberButton1
                        text={`${option}: `}
                        value={setting.value}
                        onChange={(e) => updateOption(option, e.target.value)}
                    />
                </div>
            );
        }
    }
    // map through all options (settings keys)
    // put it in a box, blue outline
    return (
        <div
            className="mx-[20%] pb-[2%] border-solid rounded-xl border-4
            bg-gradient-to-b from-white to-slate-50 border-indigo-400 "
        >
            <div
                className="text-4xl font-normal py-[1.5%] mb-[2%] bg-indigo-200
                border-solid border-indigo-400 border-b-4 rounded-t-md"
            >
                Settings
            </div>
            <div className="">
                {Object.keys(settings).map((option) => OptionInput(option))}
            </div>
        </div>
    );
}

export default MCSettingInterface;

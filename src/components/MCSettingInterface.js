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

function MCSettingInterface({ settings, updateSettings }) {
    // function to update the settings given an Option and a new value
    function updateOption(option, value) {
        // updates the Option with the name option to have the value value
        settings[option].value = value;
        updateSettings(settings);
    }

    function OptionInput(option) {
        const setting = settings[option];
        // given an option, renders either a check box or a number based on type
        if (setting.type === "ans" || setting.type === "t/f") {
            // render checkbox
            return (
                <label>
                    {option}:
                    <input
                        type="checkbox"
                        checked={settings.value}
                        // update settings when changed
                        onChange={() =>
                            updateOption(option, !settings[option].value)
                        }
                    />
                </label>
            );
        } else if (setting.type === "num") {
            return (
                <label>
                    {option}:
                    <input
                        type="number"
                        value={option.value}
                        onChange={(e) => updateOption(option, e.target.value)}
                    />
                </label>
            );
        }
    }
    // map through all options (settings keys)
    return (
        <div>{Object.keys(settings).map((option) => OptionInput(option))}</div>
    );
}

export default MCSettingInterface;

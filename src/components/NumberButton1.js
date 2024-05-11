// dieter whittingham
// may 10 2024
// NumberButton1.js

// number button component
// contains + and - button child components
// handle value state in parent
import React from "react";

/**
 * number input button
 * @param props.text input text
 * @param props.value starting value
 * @callback props.onChange callback (newValue) => {}
 */
function NumberButton1(props) {
    // tailwind bugging out
    return (
        <div className="pt-[1%]">
            <label
                className="font-normal text-2xl outline rounded-md 
            outline-2 bg-white text-indigo-400 align-middle px-[1%]
             py-[0.5%] mx-[0.5%]  "
            >
                {props.text}
                <input
                    type="number"
                    value={props.value}
                    onChange={props.onChange}
                    style={{ width: 60 }}
                    className="translate-x-[10%]"
                />
            </label>
        </div>
    );
}

export default NumberButton1;

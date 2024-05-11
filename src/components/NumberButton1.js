// dieter whittingham
// may 10 2024
// NumberButton1.js

// number button component
// contains + and - button child components

import React from "react";
import { useState } from "react";

/**
 * number input button
 * @param props.text input text
 * @param props.value starting value
 * @callback props.onChange callback (newValue) => {}
 */
function NumberButton1(props) {
    return (
        <label
            className="font-normal text-2xl outline rounded-md w-fit h-fit
            outline-2 bg-white text-indigo-400 align-middle px-[1%]
             py-[0.5%] mx-[0.5%] my-[0.5%] "
        >
            {props.text}
            <input
                type="number"
                value={props.value}
                onChange={props.onChange}
                style={{ width: 60 }}
                className="pl-[10]"
            />
        </label>
    );
}

export default NumberButton1;

// dieter whittingham
// may 10 2024
// ToggleButton1.js

import React from "react";

/**
 * on/off toggle button
 * state should be handled by parent component
 * @param props.text button text
 * @param props.on whether the toggle is on or off
 * @callback props.onClick callback
 */
function ToggleButton1(props) {
    var text = props.text;
    var styleStr =
        "font-normal text-2xl outline rounded-md h-fit outline-2 bg-white " +
        "px-[1%] py-[0.5%] mx-[0.8%] my-[0.8%] ";

    if (props.on) {
        styleStr += "text-emerald-600 hover:text-emerald-500 ";
        text += " ✔";
    } else {
        // off
        styleStr += "text-rose-700 hover:text-rose-400 ";
        text += " ✘";
    }

    return (
        <button className={styleStr} onClick={props.onClick}>
            {text}
        </button>
    );
}

export default ToggleButton1;

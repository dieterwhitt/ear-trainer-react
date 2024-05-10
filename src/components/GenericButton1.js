// dieter whittingham
// april 23 2024
// GenericButton.js

// generic button component

import React from "react";

/**
 * generic blue/grey scaling button component
 * @param props.text button text
 * @param props.enabled whether button is enabled
 * @callback props.onClick callback function upon click
 * @param props.size text size
 * @param props.buttonSize button size (1 - small 2 - med 3 - lg)
 */
function GenericButton1(props) {
    console.log("loading button");
    var styleStr = "";
    if (props.enabled) {
        styleStr =
            "bg-indigo-200 outline-indigo-400 hover:bg-indigo-300 " +
            "hover:scale-110 duration-300 ";
    } else {
        styleStr = "bg-gray-300 outline-gray-400 ";
    }
    // april 24 2024 - x padding bugging out for some reason

    styleStr +=
        "font-normal outline rounded-full " +
        "h-fit outline-2 outline-offset-2 ";
    // padding adjustments
    // default x-3% y-1.5%
    if (props.buttonSize === 1) {
        styleStr += "px-[2%] py-[1%] ";
    } else if (props.buttonSize === 3) {
        styleStr += "px-[12%] py-[6%] ";
    } else {
        // default
        styleStr += "px-[3%] py-[1.5%] ";
    }
    // check text size
    if (props.size) {
        styleStr += `text-${props.size} `;
    } else {
        styleStr += "text-3xl ";
    }
    // construct button
    return (
        <button
            className={styleStr}
            onClick={props.onClick}
            disabled={!props.enabled}
        >
            {props.text}
        </button>
    );
}

export default GenericButton1;

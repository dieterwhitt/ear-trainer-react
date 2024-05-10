// dieter whittingham
// april 22 2024
// Subheader.js

// subheader component

import React from "react";

/**
 *
 * @param props.text the text for the subheader
 */
function Subheader(props) {
    return (
        <div
            className="text-2xl animate-in fade-in
            slide-in-from-top ease-in-out duration-1000 mb-[2.5%]"
        >
            {props.text}
        </div>
    );
}

export default Subheader;

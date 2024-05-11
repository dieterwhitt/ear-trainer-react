// dieter whittingham
// may 10 2024
// Test.js

// testing page

import React from "react";
import ToggleButton1 from "../components/ToggleButton1";
import NumberButton1 from "../components/NumberButton1";

function Test() {
    return (
        <div>
            <ToggleButton1 text="shannongram" on={true} />
            <ToggleButton1 text="shannongram" on={false} />
            <NumberButton1 text="rounds: " value={10} />
        </div>
    );
}

export default Test;

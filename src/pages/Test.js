// dieter whittingham
// may 10 2024
// Test.js

// testing page

import React from "react";
import ToggleButton1 from "../components/ToggleButton1";

function Test() {
    return (
        <div>
            <ToggleButton1 text="shannongram" on={true} />
            <ToggleButton1 text="shannongram" on={false} />
        </div>
    );
}

export default Test;

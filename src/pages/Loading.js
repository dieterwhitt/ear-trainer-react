// dieter whittingham
// may 12 2024
// Loading.js

// loading page
// refactored keyboard, can now determine when it's loaded

import React from "react";
import keyboard from "../logic/keyboard";
import { useNavigate, useLocation } from "react-router-dom";

// might need usestate and useffect to refresh keyboard
import { useState } from "react";
import { useEffect } from "react";

/**
 * Loading page
 */
function Loading() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    console.log(state);

    const [loaded, setLoaded] = useState(keyboard.loaded);
    const [loadpct, setLoadpct] = useState(keyboard.loadpct);
    // to trigger rerender
    const [tick, setTick] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            // setting triggers re-render
            setLoaded(keyboard.loaded);
            setLoadpct(keyboard.loadpct);
            setTick((tick) => tick + 1);
        }, 200);
    });

    // rendering
    if (loaded) {
        return navigate(state.dest);
    } else {
        return (
            <div className="text-6xl my-[3%] font-normal">
                Loading Virtual Keyboard... {loadpct}%
            </div>
        );
    }
}

export default Loading;

// dieter whittingham
// jan 7 2024
// filename Layout.js

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
    return (
        <div className="bg-slate-100 min-h-screen font-font1 text-center">
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Layout;

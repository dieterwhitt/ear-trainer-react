//dieter whittingham
//jan 7 2023
//filename Layout.js

import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
    <>
        <nav>
            <Link to= "/intervals">intervals</Link>
        </nav>  

        <Outlet/>
    </>
    )
}

export default Layout
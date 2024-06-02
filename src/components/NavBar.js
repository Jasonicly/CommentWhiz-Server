import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/newpage">New Page</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

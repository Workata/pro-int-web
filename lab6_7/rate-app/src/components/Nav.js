import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";

import {Auth} from "../context/authContext";

const Nav = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">ReactContextHooksFirebase</Link></li>
            </ul>
            <ul>
                <li><Link to="/create">New post</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import firebase from "../firebase/config";

import {Auth} from "../context/authContext";

const Nav = (props) => {

    const [userState, setUserState] = useState(null);

    useEffect( () => {
        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
            }
        })
    })

    const logout = () =>{
        // logout the user
        firebase.logout();
        setUserState(null);
        // props.history.replace("/login");
    }

    let buttons;
        if(userState == null){
            buttons = (
                <React.Fragment>
                    <li><Link to="/signin">Sign in</Link></li>
                    <li><Link to="/login">Log in</Link></li>
                </React.Fragment>
            )
        }else{
            buttons = (
                <React.Fragment>
                    <li><button onClick={logout}>Log out</button></li>
                </React.Fragment>
            )
        }

    return(
        <nav>
            <ul>
                <li><Link to="/">ReactContextHooksFirebase</Link></li>
            </ul>
            <ul>
                {buttons}
            </ul>
        </nav>
    )
}

export default Nav;
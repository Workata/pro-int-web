import React, {useState} from "react";
import firebase from "../firebase/config";
import {Auth} from "../context/authContext";
import { Switch } from "react-router";
import {Redirect, withRouter} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../css/Login.css';

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {state, dispatch} = React.useContext(Auth);

    const [routeRedirect, setRedirect] = useState(false);

    const signin = async (e) => {
        e.preventDefault();
        
        let response = await firebase.signin(email, password);
        if(response.hasOwnProperty("message")){
            console.log(response.message);
            
        }else{
            console.log(response.user);
            setRedirect(true);
            // return dispatch({
            //     type: "SIGNIN",
            //     payload: response
            // })
        }

        console.log(state.user);
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/"/>
    }

    return (
        <React.Fragment>

            <div id="loginContainer" className="center">

                <div style={{textAlign: "center"}}>
                    <TextField
                        label="Email"
                        placeholder="Enter email"
                        type="email"
                        variant="outlined"
                        // className={classes.loginTextField}
                        // onChange={({ target: { value } }) => {
                        // setTypedUsername(value);
                        // }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            <br></br>
            <br></br>

                <div style={{textAlign: "center"}}>
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                        autoComplete="current-password"
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
            <br></br>
            <br></br>
                <div style={{textAlign: "center"}}>
                    <Button variant="contained" color="primary" size="large" onClick={signin}>
                        Register
                    </Button>
                </div>
            </div>

            {/* <form onSubmit={signin}>
                <p>Create an Account</p>

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange = {(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange = {(e) => setPassword(e.target.value)}/>

                <input type="submit" value = "Create account"/>

            </form> */}
        </React.Fragment>
    )
}

export default withRouter(Signin);
import React, {useState} from "react";
import {Redirect, withRouter, Link} from "react-router-dom";
import '../css/Login.css';
import firebase from "../firebase/config";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    IconButton,
  } from '@material-ui/core';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [routeRedirect, setRedirect] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        let user = await firebase.login(email, password);
        console.log(user);
        //setTimeout(function(){setRedirect(true)}, 10000);
        setRedirect(true)

    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/"/>
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

    return(
        <React.Fragment>

            <div id="goBackIcon">
                <Link to="/" className="link">
                    <IconButton>
                        <ArrowBackIcon style={{fill: "white"}} />
                    </IconButton>
                </Link>
            </div>

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
                    <Button variant="contained" color="primary" size="large" onClick={login}>
                    Login
                    </Button>
                </div>

                {/* <form onSubmit={login}>
                    <p>Welcome back</p>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>

                    <br></br>

                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" onChange = {(e) => setPassword(e.target.value)}/>

                    <br></br>
                    <br></br>

                    <input type="submit" value="Login"/>
                </form> */}
            </div>
        </React.Fragment>
    )
}

export default Login;


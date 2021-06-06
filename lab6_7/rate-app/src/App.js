import './css/App.css';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, {useState, useEffect} from "react";
import firebase from "./firebase/config";
import Routes from "./routes";
import Login from "./components/Login"

function App() {

  
  const [userState, setUserState] = useState(null);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const unsubscribe =
    firebase.auth.onAuthStateChanged( (u) => {
      if (u) {
        setUserState(u);
      } else {
        console.log("User not logged")
        setUserState(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // window.onload = function() {
  //   if(!window.location.hash) {
  //     window.location = window.location + '#loaded';
  //     window.location.reload();
  //   }
  // }

  const logout = () =>{
    // logout the user
    firebase.logout();
    setUserState(null);
    setUserID('');
    // props.history.replace("/login");
  }


  if(userState)
    return (
        <Router basename="/">
        <div id="appContainer">
          <Switch>
            <Route exact path="/">

            {userID}

              <div id = "menu" className="center">
                <Link to="/rate-films" className="link">
                  <Button variant="contained" color="primary" size="large">
                    Rate films
                  </Button>
                </Link>

                <br></br>
                <br></br>

                <Link to="/rate-series" className="link">
                  <Button variant="contained" color="primary" size="large">
                    Rate series
                  </Button>
                </Link>

                <br></br>
                <br></br>

                <Button variant="contained" color="primary" size="large" onClick={logout}>
                    Log out
                </Button>

              </div>


            </Route>
          </Switch>

          <Routes/>

        </div>
      </Router> 


    );


  return (

    <Router basename="/pro-int-web">
      <div id="appContainer">
        <Switch>
          <Route exact path="/">

            {userID}

            <div id = "menu" className="center">
              {/* {userState.uid} */}
              <Link to="/login" className="link">
                <Button variant="contained" color="primary" size="large">
                  Login
                </Button>
              </Link>

              <br></br>
              <br></br>

              <Link to="/register" className="link">
                  <Button variant="contained" color="primary" size="large">
                    Register
                  </Button>
              </Link>

            </div>


          </Route>
        </Switch>

        <Routes/>

      </div>
    </Router> 
    
  );
}

export default App;

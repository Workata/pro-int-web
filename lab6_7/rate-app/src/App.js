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
import Nav from "./components/Nav";
import Login from "./components/Login"

function App() {

  
  const [userState, setUserState] = useState(null);
  const [userID, setUserID] = useState('');

  let buttons;

  useEffect( () => {
      firebase.getUserState().then(user => {
          if(user){
              setUserState(user);
              setUserID(user.uid);
              // window.location.reload();
              // if(!window.location.hash) {
              //   window.location = window.location + '#loaded';
              //   window.location.reload();
              // }
          }
          else{
            setUserState(null);
            setUserID(null);
          }
      })

  }, [])

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

  
  // if(userState == null){
  //     buttons = (
  //         <React.Fragment>
  //             <Link to="/login" className="link">
  //               <Button variant="contained" color="primary" size="large">
  //                 Login
  //               </Button>
  //             </Link>

  //             <br></br>
  //             <br></br>

  //             <Link to="/register" className="link">
  //               <Button variant="contained" color="primary" size="large">
  //                 Register
  //               </Button>
  //             </Link>
  //         </React.Fragment>
  //     )
  // }else{
  //     buttons = (
  //         <React.Fragment>
  //             {/* Hello {userState.uid} */}
  //             <Link to="/login" className="link">
  //               <Button variant="contained" color="primary" size="large">
  //                 Rate films
  //               </Button>
  //             </Link>

  //             <br></br>
  //             <br></br>

  //             <Link to="/register" className="link">
  //               <Button variant="contained" color="primary" size="large">
  //                 Rate series
  //               </Button>
  //             </Link>

  //             <br></br>
  //             <br></br>

  //             <Button variant="contained" color="primary" size="large" onClick={logout}>
  //                 Log out
  //             </Button>
  //         </React.Fragment>
  //     )
  // }

  if(userState)
    return (
        <Router basename="/">
        <div id="appContainer">
          <Switch>
            <Route exact path="/">

            {userID}

              <div id = "menu" className="center">
                <Link to="/login" className="link">
                  <Button variant="contained" color="primary" size="large">
                    Rate films
                  </Button>
                </Link>

                <br></br>
                <br></br>

                <Link to="/register" className="link">
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

    <Router basename="/">
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

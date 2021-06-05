import './css/App.css';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Routes from "./routes";
import Nav from "./components/Nav";

function App() {


  return (


    <div className="App"> 
      <Nav/>
      <main>
        <Routes/>
      </main>
    </div>

    
    
  );
}

export default App;

import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddStudent from './AddStudent';
import StudentsList from './StudentsList';
import SearchStudents from './SearchStudents';
import CandidatesCounter from './CandidatesCounter';
import './css/App.css';
import Button from '@material-ui/core/Button';

function App() {

  const { v4: uuidv4 } = require('uuid');
  const [students, setStudents] = useState([
  {"id": uuidv4(), "name": "Jakub", "description": "Hi, I like projects, yes. Hire me.", "email": "greatmail@gmail.com", "tags": "Docker, AWS", "show": true},
  {"id": uuidv4(), "name": "Anna", "description": "I like trains and python.", "email": "pentakill@gmail.com", "tags": "Python, Linux", "show": true},
  {"id": uuidv4(), "name": "Magda", "description": "I play minecraft and do math stuff.", "email": "mcForLive@gmail.com", "tags": "Matlab, Assembly, Prolog, Docker", "show": true},
  {"id": uuidv4(), "name": "Mati", "description": "Yes, python very cool.", "email": "matimatimati@gmail.com", "tags": "Python", "show": true}
])
  
  function handleAddStudent(studentData){
    // ! Validation
    setStudents(prevStudents => {
      return [...prevStudents, {
        id: uuidv4(),
        name: studentData.name,
        description: studentData.description,
        email: studentData.email,
        tags: studentData.tags,
        show: studentData.show
      }]
    })
  } 

  function searchByTag(tag){
    var filteredStudents = []

    // reset show attribute
    students.forEach(student => 
      {
        student.show = true;
        filteredStudents.push(student);
      })
    setStudents(filteredStudents)

    if(tag === '') return;

    filteredStudents = []

    students.forEach(student => 
      {
        if(!student.tags.includes(tag)) student.show = false;
        filteredStudents.push(student)
      })
    setStudents(filteredStudents)
  } 

  function searchByDesc(desc){
    var filteredStudents = []

    // reset show attribute
    students.forEach(student => 
      {
        student.show = true;
        filteredStudents.push(student);
      })
    setStudents(filteredStudents)

    if(desc === '') return;

    filteredStudents = []

    students.forEach(student => 
      {
        if(!student.description.includes(desc)) student.show = false;
        filteredStudents.push(student)
      })
    setStudents(filteredStudents)
  } 


  return (
    <Router>
      <div id="appContainer" className="center">
        <Switch>
          <Route exact path="/">
            <div id = "menu">
              <Link to="/search" className="link">
                <Button variant="contained" color="primary" size="large">
                  Search for a student
                </Button>
              </Link>

              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <Link to="/add" className="link">
                <Button variant="contained" color="primary" size="large">
                  Add a new student
                </Button>
              </Link>
            </div>
          </Route>

          <Route path="/search">

            <Link to="/" className="link">
              <Button variant="contained" color="primary" size="medium"  id="backButton">
                    Back
              </Button>
            </Link>

            <div id="searchContainer">
              <SearchStudents searchByTag={searchByTag} searchByDesc={searchByDesc}/>
            </div>
            <div id="studentsContainer">
              <CandidatesCounter students={students}/>
              <StudentsList students={students}/>
            </div>
            <div style={{clear:'both'}}></div>
          </Route>

          <Route path="/add">
            <div id="addContainer">
              <AddStudent handleAddStudent={handleAddStudent}/>
            </div>
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;

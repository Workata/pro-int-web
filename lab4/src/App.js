import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddStudent from './AddStudent';
import AddGroup from './AddGroup';

import StudentsList from './StudentsList';
import GroupsList from './GroupsList';

import SearchStudents from './SearchStudents';
import SearchGroups from './SearchGroups';

import CandidatesCounter from './CandidatesCounter';
import GroupsCounter from './GroupsCounter';

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

  const [groups, setGroups] = useState([
  {"id": uuidv4(), "name": "Team-A", "description": "We are big group. Yes.", "email": "teamA@gmail.com", "tags": "Docker, AWS", "show": true},
  {"id": uuidv4(), "name": "Perfectionists_With_Deadlines", "description": "Deadline? Just copy paste code from previous project, lmao.", "email": "PWD@gmail.com", "tags": "Python, Linux", "show": true},
  {"id": uuidv4(), "name": "NiceGuys", "description": "Small group of people", "email": "dummy@gmail.com", "tags": "Matlab, Assembly, Prolog, Docker", "show": true},
  {"id": uuidv4(), "name": "NiceGirls", "description": "We are looking for java script developer. Type script bad.", "email": "notTS@gmail.com", "tags": "JS", "show": true}
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

  function handleAddGroup(groupData){
    // ! Validation
    setGroups(prevGroups => {
      return [...prevGroups, {
        id: uuidv4(),
        name: groupData.name,
        description: groupData.description,
        email: groupData.email,
        tags: groupData.tags,
        show: groupData.show
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

  function searchByTagGroup(tag){
    var filteredGroups = []

    // reset show attribute
    groups.forEach(group => 
      {
        group.show = true;
        filteredGroups.push(group);
      })
    setGroups(filteredGroups)

    if(tag === '') return;

    filteredGroups = []

    groups.forEach(group => 
      {
        if(!group.tags.includes(tag)) group.show = false;
        filteredGroups.push(group)
      })
    setGroups(filteredGroups)
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

  function searchByDescGroup(desc){
    var filteredGroups = []

    // reset show attribute
    groups.forEach(group => 
      {
        group.show = true;
        filteredGroups.push(group);
      })
    setGroups(filteredGroups)

    if(desc === '') return;

    filteredGroups = []

    groups.forEach(group => 
      {
        if(!group.description.includes(desc)) group.show = false;
        filteredGroups.push(group)
      })
    setGroups(filteredGroups)
  } 


  return (
    <Router>
      <div id="appContainer" className="center">
        <Switch>
          <Route exact path="/pro-int-web">
            <div id = "menu">
              <Link to="/searchStudents" className="link">
                <Button variant="contained" color="primary" size="large">
                  Search for a student
                </Button>
              </Link>

              <br></br>
              <br></br>

              <Link to="/pro-int-web/addStudent" className="link">
                <Button variant="contained" color="primary" size="large">
                  Add a new student
                </Button>
              </Link>

              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <Link to="/searchGroup" className="link">
                <Button variant="contained" color="primary" size="large">
                  Search for a group
                </Button>
              </Link>

              <br></br>
              <br></br>

              <Link to="/addGroup" className="link">
                <Button variant="contained" color="primary" size="large">
                  Add a new group
                </Button>
              </Link>

            </div>
          </Route>

          <Route path="/searchStudents">
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

          
          <Route path="/searchGroup">
            <Link to="/" className="link">
              <Button variant="contained" color="primary" size="medium"  id="backButton">
                    Back
              </Button>
            </Link>

            <div id="searchGroupsContainer">
              <SearchGroups searchByTagGroup={searchByTagGroup} searchByDescGroup={searchByDescGroup}/>
            </div>

            <div id="groupsContainer">
              <GroupsCounter groups={groups}/>
              <GroupsList groups={groups}/>
            </div>

            <div style={{clear:'both'}}></div>
          </Route>

          <Route path="/addStudent">
            <Link to="/" className="link">
              <Button variant="contained" color="primary" size="medium"  id="backButton">
                    Back
              </Button>
            </Link>
            <div id="addContainer">
              <AddStudent handleAddStudent={handleAddStudent}/>
            </div>
          </Route>

          <Route path="/addGroup">
            <Link to="/" className="link">
              <Button variant="contained" color="primary" size="medium"  id="backButton">
                    Back
              </Button>
            </Link>
            <div id="addContainer">
              <AddGroup handleAddGroup={handleAddGroup}/>
            </div>
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;

import React, { Component, useState} from 'react';
import './css/AddStudent.css';
import Button from '@material-ui/core/Button';

export default class AddGroup extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', description: '', email: '', tags: ''};
      }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
      }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
      }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
      }

    changeTagsHandler = (event) => {
        this.setState({tags: event.target.value});
      }

    submitStudentHandler = (event) => {
        event.preventDefault();
        //alert("You are submitting " + this.state.name + " " + this.state.description + " " + this.state.email + " " + this.state.tags);
        if(this.state.name === '' || this.state.description === '' || this.state.email === '' || this.state.tags === '')
        {
          alert('Fields cannot be empty. Please fill them.')
          return
        }
        this.props.handleAddGroup({'name': this.state.name, 'description': this.state.description, 'email': this.state.email, 'tags': this.state.tags, 'show': true});
        // * reset fields
        this.state.name = ''
        this.state.description = ''
        this.state.email = ''
        this.state.tags = ''
      }

    render() {
        return (
            <div id = "addStudentContainer">
                {/* <span id="addDesc">Add a new student:</span> */}
                <form onSubmit = {this.submitStudentHandler}>
                    <input type="text" value={this.state.name}  onChange={this.changeNameHandler}  placeholder="Group's name" className="add-input"></input><br></br>
                    <input type="text" value={this.state.description} onChange={this.changeDescriptionHandler}  placeholder="Group's description" className="add-input"></input><br></br>
                    <input type="text" value={this.state.email} onChange={this.changeEmailHandler}  placeholder="Group's e-mail" className="add-input"></input><br></br>
                    <input type="text" value={this.state.tags} onChange={this.changeTagsHandler}  placeholder="Tags (technologies)" className="add-input"></input><br></br>
                    {/* <input type="submit" value="Add student"/> */}
                    <Button variant="contained" color="primary" size="large" type="submit" id="addButton">
                      Add a group
                    </Button>
                </form>
            </div>
        );
    }
}

import React, { Component } from 'react'
import './css/SearchStudents.css'

export default class SearchGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { searchTag: '', searchDescription: ''};
      }

    changeTagHandler = (event) => {
        this.setState({searchTag: event.target.value});
        this.props.searchByTag(event.target.value);
      }

    changeDescriptionHandler = (event) => {
        this.setState({searchDescription: event.target.value});
        this.props.searchByDesc(event.target.value);
      }

    render() {
        return (
            <div>
                <input type="text" value={this.state.searchTag}  onChange={this.changeTagHandler}  placeholder="Search by tag" className="searchInput"></input><br></br>
                <input type="text" value={this.state.searchDescription} onChange={this.changeDescriptionHandler}  placeholder="Search by description" className="searchInput"></input>
            </div>
        )
    }
}

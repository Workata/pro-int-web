import React, {useEffect, useState} from "react";
import {Redirect, withRouter} from "react-router-dom";
import firebase from "../firebase/config";

const Create = (props) => {

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [routeRedirect, setRedirect] = useState(false);


    const addPost = async(e) => {
        e.preventDefault();
        
        let post = {
            title,
            rating
        }

        await firebase.createPost(post).then(() => {
            console.log("Success");
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        });
    }

    let createForm;
    createForm = (
        <form onSubmit={addPost}>
            <p>Add new film</p>
            <label htmlFor="title">Film title:</label>
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}></input>

            <label htmlFor="rating">Film rating:</label>
            <input type="number" name="rating" onChange={(e) => setRating(e.target.value)}></input>

            <input type="submit"></input>

        </form>
    )

    return (
        <React.Fragment>
            {createForm}
        </React.Fragment>
    )
}

export default Create;
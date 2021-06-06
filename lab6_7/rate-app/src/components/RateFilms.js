import React, {useEffect, useState} from "react";
import {Redirect, withRouter} from "react-router-dom";
import firebase from "../firebase/config";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
  } from '@material-ui/core';
  import { DataGrid, GridColDef } from '@material-ui/data-grid';
  import '../css/RateFilms.css';
//   import ArrowBackIcon from '@material-ui/icons/ArrowBack';


  const columns = [
    {
      field: 'titleField',
      headerName: 'Title',
      width: 380,
      disableClickEventBubbling: true,
    },
  
    {
      field: 'ratingField',
      headerName: 'Rating',
      width: 200,
      disableClickEventBubbling: true,
    },
  ];


const RateFilms = (props) => {

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [routeRedirect, setRedirect] = useState(false);

    const [userState, setUserState] = useState(null);

    const [films, setFilms] = useState([
        { id: '', titleField: '',  ratingField: '' },
      ]);
    
    const fetchFilms = async (u) => {
        const userFilms = await firebase.getPosts(u).catch(err => {
            console.log(err);
        });
        
        console.log(userFilms);

        var filmsInTable = [];

        userFilms.forEach(film => {
            filmsInTable.push({
                id: film.id,
                titleField: film.data.title,
                ratingField: film.data.rating
            });
          });
        
          console.log(filmsInTable);

        setFilms(filmsInTable);
    }

    useEffect(() => {
        const unsubscribe =
        firebase.auth.onAuthStateChanged( async (u) => {
          if (u) {
            setUserState(u);
            fetchFilms(u);

          } else {
            console.log("User not logged")
            setUserState(null);
          }
        });
        return () => unsubscribe();
      }, []);


    const addFilm = async(e) => {
        e.preventDefault();
        
        let film = {
            title,
            rating
        }

        await firebase.createPost(userState, film).then(() => {
            console.log("Success");
            fetchFilms(userState);
            
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <React.Fragment>
        
        <div id="addFilmContainer" className="center-h">

            <div style={{textAlign: "center"}}>
                    <TextField
                        label="Film title"
                        placeholder="Title"
                        variant="outlined"
                        onChange={(e) => setTitle(e.target.value)}
                    />
            </div>
            
            <br></br>

            <div style={{textAlign: "center"}}>
                    <TextField
                        label="Film rating"
                        placeholder="Rating"
                        variant="outlined"
                        onChange={(e) => setRating(e.target.value)}
                    />
            </div>

            <br></br>

            <div style={{textAlign: "center"}}>
                    <Button variant="contained" color="primary" size="large" onClick={addFilm}>
                        Add film
                    </Button>
            </div>

        </div>

        <div id = "filmTableContainer" className="center">
            <DataGrid
            rows={films}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick={true}
            />
        </div>

        </React.Fragment>
    )
}

export default RateFilms;
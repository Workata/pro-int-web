import React, {useEffect, useState} from "react";
import {Redirect, withRouter} from "react-router-dom";
import firebase from "../firebase/config";
import {
    Button,
    IconButton,
    TextField,
  } from '@material-ui/core';
  import { DataGrid, GridColDef } from '@material-ui/data-grid';
  import '../css/RateFilms.css';
  import ArrowBackIcon from '@material-ui/icons/ArrowBack';
  import DeleteIcon from '@material-ui/icons/Delete';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


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
      width: 150,
      disableClickEventBubbling: true,
    },

    {
        field: 'deleteField',
        headerName: 'Delete',
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
            return(
              <IconButton>
                <DeleteIcon />
              </IconButton>
            )
        },
      },

  ];


const RateSeries = (props) => {

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [routeRedirect, setRedirect] = useState(false);

    const [userState, setUserState] = useState(null);

    const [series, setSeries] = useState([
        { id: '', titleField: '',  ratingField: '' },
      ]);
    
    const fetchSeries = async (u) => {
        const userSeries = await firebase.getSeries(u).catch(err => {
            console.log(err);
        });
        
        console.log(userSeries);

        var seriesInTable = [];

        userSeries.forEach(series => {
            seriesInTable.push({
                id: series.id,
                titleField: series.data.title,
                ratingField: series.data.rating
            });
          });
        
          console.log(seriesInTable);

        setSeries(seriesInTable);
    }

    useEffect(() => {
        const unsubscribe =
        firebase.auth.onAuthStateChanged( async (u) => {
          if (u) {
            setUserState(u);
            fetchSeries(u);

          } else {
            console.log("User not logged")
            setUserState(null);
          }
        });
        return () => unsubscribe();
      }, []);

    const deleteSeries = async(series) => {
        console.log("delete", series);

        await firebase.deleteSeries(series).then(() => {
            console.log("Success");
            fetchSeries(userState);
            
        }).catch(err => {
            console.log(err);
        });

        fetchSeries(userState);

    }

    const addSeries = async(e) => {
        e.preventDefault();
        
        let series = {
            title,
            rating
        }

        await firebase.addSeries(userState, series).then(() => {
            console.log("Success");
            fetchSeries(userState);
            
        }).catch(err => {
            console.log(err);
        });

        setRating("");
        setTitle("");
    }


    return (
        <React.Fragment>

        <div id="goBackIcon">
            <Link to="/" className="link">
                <IconButton>
                    <ArrowBackIcon style={{fill: "white"}} />
                </IconButton>
            </Link>
        </div>
        
        <div id="addFilmContainer" className="center-h">

            <div style={{textAlign: "center"}}>
                    <TextField
                        label="Series title"
                        placeholder="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
            </div>
            
            <br></br>

            <div style={{textAlign: "center"}}>
                    <TextField
                        label="Series rating"
                        placeholder="Rating"
                        variant="outlined"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
            </div>

            <br></br>

            <div style={{textAlign: "center"}}>
                    <Button variant="contained" color="primary" size="large" onClick={addSeries}>
                        Add series
                    </Button>
            </div>

        </div>

        <div id = "filmTableContainer" className="center">
            <DataGrid
            rows={series}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick={true}
            onCellClick={(params, event) => {
                if (params.field === '__check__') return;
                if (params.field === 'deleteField') {
                  deleteSeries(params.row.id);
                  return;
                }
                // setSelectedWorkspace(params.row.name);
                // history.push(`/workspaces/${params.row.name}`);
              }}
            />
        </div>

        </React.Fragment>
    )
}

export default RateSeries;
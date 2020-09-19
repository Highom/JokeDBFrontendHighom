import React, { useEffect, useState } from 'react';
import './App.css';
import {TableCell, TableBody,Table, Typography, Button, TableContainer, TableHead, TableRow} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
const axios = require('axios');

function App() {
  const [jokes,setJokes] = useState([]);
 let api = "http://localhost:8080/sql/jokes";

 
  useEffect( () => {
    axios.get(api)
    .then(res => { setJokes(res.data)})
    .catch( err => {console.log(err)});
  }, []);

  const onDelete = (id) => {
    axios.delete(api + "/" + id).then(
      axios.get(api)
      .then(res => { setJokes(res.data)})
      .catch( err => {console.log(err)})
    )
  }

  return (
    <div className="App">
      <header>
        <Typography>test</Typography>
      </header>
     <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>text</TableCell>
            <TableCell>rating</TableCell>
            <TableCell>date</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jokes.map((joke) => (
            <TableRow key={joke.id}>
              <TableCell component="th" scope="row">
                {joke.id}
              </TableCell>
              <TableCell>{joke.text}</TableCell>
              <TableCell>{joke.rating}</TableCell>
              <TableCell>{joke.date}</TableCell>
              <TableCell>
                <Button variant="contained"
                  color="primary">
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained"
                  color="secondary"
                  onClick={onDelete(joke.id)}
                  startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;

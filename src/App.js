import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import './App.css';
import {TableCell, TableBody,Table, Button, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, TextField, Select} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

function App() {
  const textFieldRef = useRef();
  const ratingFieldRef = useRef();
  const [jokes,setJokes] = useState([]);
  const [request, setRequest] = useState([]);
  const [database, setDatabase] = useState("sql")
  const [open, setOpen] = useState(false);
  let api = `http://localhost:8080/${database}/jokes`;

 
  useEffect( () => {
    Axios.get(api)
    .then(res => { setJokes(res.data)})
    .catch( err => {console.log(err)});
  }, []);

  const onDelete = id => {
      if (window.confirm("Are you sure you want to delete this?")) {
        Axios.delete(`${api}/${id}`).then(
          Axios.get(api)
          .then(res => { setJokes(res.data)})
          .catch( err => {console.log(err)})
        ) 
      }
  }

  const onEdit  = joke => {
    setRequest({
      path: `${api}/${joke.id}`,
      type: "PUT",
      text: joke.text,
      rating: joke.rating
    });
    setOpen(true);
  }

  const onAdd  = () => {
    setRequest({
      path: `${api}`,
      type: "POST",
      text: "",
      rating: null
    });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setDatabase(event.target.value)
  };

 const handleSubmit = (event) => {
    event.preventDefault();
    Axios({
      method: request.type,
      url: request.path,
      data: {text: textFieldRef.current.value, rating: ratingFieldRef.current.value}
    }).catch( err => {console.log(err)});
    handleClose();
 }


  return (
    <div className="App">
      <Select
        native
        value={database}
        onChange={handleChange}
        inputProps={{
          name: 'Database',
          id: 'DatabaseSelect',
        }}
      >
        <option value="sql">SQL</option>
        <option value="mdb">MDB</option>
        <option value="csv">CSV</option>
      </Select>
      <Button
        color="primary"
        onClick={() => onAdd()}>
        Add new Joke
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="newJokeDialog">
        <DialogTitle id="newJokeDialog">Edit/Add Joke</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="text"
              autoFocus
              margin="dense"
              id="text"
              label="Joke"
              fullWidth
              defaultValue={request.text}
              inputRef={textFieldRef}
            />
            <TextField
              name="rating"
              margin="dense"
              id="rating"
              label="Rating"
              type="number"
              fullWidth
              defaultValue={request.rating}
              inputRef={ratingFieldRef}
            />
            <div>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit" label="submit">
              Submit
            </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
     <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>text</TableCell>
            <TableCell>rating</TableCell>
            <TableCell>date</TableCell>
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
              <TableCell align="right">
                <Button variant="contained"
                  color="primary"
                  onClick={() => onEdit(joke)}>
                  Edit
                </Button>
                <Button variant="contained"
                  color="secondary"
                  onClick={() => onDelete(joke.id)}
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

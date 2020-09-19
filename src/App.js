import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {

function createData(id, text, rating, date) {
  return { id, text, rating, date };
}

  const rows = [
    createData(1, 'joke 1', 3, 24),
    createData(2, 'joke 2', 2, 37),
    createData(3, 'joke 3', 1, 24),
    createData(4, 'joke 4', 4, 67),
  ];

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
            <TableCell align="right">text</TableCell>
            <TableCell align="right">rating</TableCell>
            <TableCell align="right">date</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.text}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">
                <Button variant="contained"
                  color="secondary"
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

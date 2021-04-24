import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  makeStyles,
  createStyles
} from '@material-ui/core';
import { Todo } from '../types';

interface InputFormProps {
  insert: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const useStyles = makeStyles(() =>
  createStyles({
    inputForm: {
      marginTop: '80px',
      width: '40%',
      height: '20%',
      display: 'flex',
      flexDirection: 'column'
    },
    saveBtn: {
      width: '50%',
      margin: 'auto'
    },
    inputField: {
      width: '90%',
      margin: 'auto'
    }
  })
);

export default function InputForm(props: InputFormProps) {
  const [input, setInput] = useState('');
  const { insert } = props;
  const classes = useStyles();

  function handleSubmit() {
    fetch('http://localhost:4000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo: input
      })
    })
      .then(async (response) => {
        const item = await response.json();

        insert((items) => [...items, item]);
        setInput('');
      })
      .catch(console.error);
  }

  return (
    <Card className={classes.inputForm}>
      <TextField
        placeholder="Insert a todo item ..."
        variant="filled"
        className={classes.inputField}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className={classes.saveBtn}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!input}
      >
        Save
      </Button>
    </Card>
  );
}

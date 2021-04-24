import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Todo } from '../types';

interface InputFormProps {
  insert: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function InputForm(props: InputFormProps) {
  const [input, setInput] = useState('');
  const { insert } = props;

  function handleSubmit() {
    const todo = input;

    fetch('http://localhost:4000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo
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
    <>
      <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
}

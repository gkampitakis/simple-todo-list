import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Header, InputForm, List } from './components';
import { Todo } from './types';

function App() {
  const [items, setItems] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/todo/all')
      .then(async (response) => {
        const data = await response.json();

        setItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <Grid container>
        <InputForm insert={setItems} />
        <List list={items} />
      </Grid>
    </>
  );
}

export default App;

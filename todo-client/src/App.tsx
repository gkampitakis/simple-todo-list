import React, { useEffect, useState } from 'react';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import { Header, InputForm, List } from './components';
import { Todo } from './types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '90vh',
      flexGrow: 1
    },
    container: {
      alignItems: 'center',
      height: '100%'
    }
  })
);

function App() {
  const [items, setItems] = useState<Todo[]>([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('http://localhost:4000/todo/all')
      .then(async (response) => {
        const data = await response.json();

        setItems(data);
      })
      .catch(console.error);
  }, []);

  function removeItem(id: string) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Grid container direction={'column'} className={classes.container}>
          <InputForm insert={setItems} />
          <List list={items} removeItem={removeItem} />
        </Grid>
      </div>
    </>
  );
}

export default App;

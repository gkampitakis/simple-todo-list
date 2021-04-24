import React from 'react';
import { Grid } from '@material-ui/core';
import { Header, InputForm, List } from './components';

function App() {
  return (
    <>
      <Header />
      <Grid container>
        <InputForm></InputForm>
        <List></List>
      </Grid>
    </>
  );
}

export default App;

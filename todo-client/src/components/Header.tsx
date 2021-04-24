import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flex: 15
    }
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Simple Todo List 📝
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

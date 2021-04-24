import React from 'react';
import {
  createStyles,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  darken,
  Divider
} from '@material-ui/core';
import {
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { Todo } from '../types';

type ListProps = {
  list: Todo[];
  removeItem: (id: string) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: darken('#fff', 0.03),
      marginTop: '50px',
      maxHeight: '50%',
      overflow: 'auto',
      width: '50%',
      borderRadius: '5px'
    }
  })
);

export default function TodoList(props: ListProps) {
  const { list, removeItem } = props;
  const classes = useStyles();

  function deleteTodo(id: string) {
    fetch(`http://localhost:4000/todo/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status === 204) {
          removeItem(id);
          return;
        }
        console.error('Something went wrong');
      })
      .catch(console.error);
  }

  return (
    <List className={classes.root}>
      {list.map((item) => (
        <div key={item.id}>
          <ListItem>
            <ListItemAvatar>
              <CheckCircleIcon color={'primary'} />
            </ListItemAvatar>
            <ListItemText primary={item.todo} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                data-testid={'delete_' + item.id}
                onClick={() => deleteTodo(item.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}

import React from 'react';
import { Todo } from '../types';

type ListProps = {
  list: Todo[];
};

export default function List(props: ListProps) {
  const { list } = props;

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.todo}</li>
      ))}
    </ul>
  );
}

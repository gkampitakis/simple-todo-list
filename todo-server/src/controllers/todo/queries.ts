export function insertTodoQuery(todo: string) {
  return {
    text:
      'INSERT INTO todos (todo) VALUES ($1) RETURNING createdat as "createdAt", id, todo',
    values: [todo]
  };
}

export function updateTodoQuery(id: string, todo: string) {
  return {
    text: `UPDATE todos 
      SET todo=$1
      WHERE id=$2 
      RETURNING createdat as "createdAt", id, todo`,
    values: [todo, id]
  };
}

export function deleteTodoQuery(id: string) {
  return {
    text: `DELETE FROM todos
    WHERE id=$1`,
    values: [id]
  };
}

export function getTodoQuery(id: string) {
  return {
    text: `SELECT createdat as "createdAt",id,todo FROM todos
          WHERE id=$1`,
    values: [id]
  };
}

export function getTodosQuery() {
  return {
    text: `SELECT createdat as "createdAt",id,todo FROM todos ORDER BY createdat DESC`
  };
}

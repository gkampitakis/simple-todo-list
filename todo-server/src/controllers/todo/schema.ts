import S from 'fluent-json-schema';
import { Schema } from '../../fastify.types';

const TodoSchema = S.object()
  .prop('id', S.string().format('uuid').required())
  .prop('todo', S.string().required())
  .prop('createdAt', S.string().format('date-time').required());

const ErrorSchema = S.object()
  .prop('message', S.string().required())
  .prop('statusCode', S.string().required())
  .prop('error', S.string().required());

export const getTodoSchema: Schema = {
  summary: 'Get a todo',
  description: 'Route for getting a todo by id',
  params: S.object().prop('id', S.string().format('uuid').minLength(1)),
  response: {
    200: TodoSchema,
    404: ErrorSchema
  }
};

export const getTodosSchema: Schema = {
  summary: 'Get all todos',
  description: 'Route for getting all todos',
  response: {
    200: S.array().items(TodoSchema)
  }
};

export const deleteTodoSchema: Schema = {
  summary: 'Delete a todo',
  description: 'Route for deleting a todo by id',
  params: S.object().prop('id', S.string().format('uuid').minLength(1)),
  response: {
    204: {},
    404: ErrorSchema
  }
};
export const updateTodoSchema: Schema = {
  summary: 'Update a todo',
  description: 'Route for updating a todo by id',
  params: S.object().prop('id', S.string().format('uuid').minLength(1)),
  response: {
    200: TodoSchema,
    404: ErrorSchema
  }
};
export const createTodoSchema: Schema = {
  summary: 'Create a todo',
  description: 'Route for creating a todo',
  response: {
    200: TodoSchema
  }
};

import { FastifyError, FastifyInstance } from 'fastify';
import {
  createTodoSchema,
  deleteTodoSchema,
  getTodoSchema,
  getTodosSchema,
  updateTodoSchema
} from './schema';
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo
} from './controller';
import { CreateRequest, ParamsIdRequest, UpdateRequest } from './types';

export default (
  fastify: FastifyInstance,
  options: unknown,
  done: (err?: FastifyError) => void
): void => {
  fastify.get('/all', { schema: getTodosSchema }, (req, reply) =>
    getTodos(fastify, req, reply)
  );
  fastify.get(
    '/:id',
    { schema: getTodoSchema },
    (req: ParamsIdRequest, reply) => getTodo(fastify, req, reply)
  );
  fastify.post('/', { schema: createTodoSchema }, (req: CreateRequest, reply) =>
    createTodo(fastify, req, reply)
  );
  fastify.put(
    '/:id',
    { schema: updateTodoSchema },
    (req: UpdateRequest, reply) => updateTodo(fastify, req, reply)
  );
  fastify.delete(
    '/:id',
    { schema: deleteTodoSchema },
    (req: ParamsIdRequest, reply) => deleteTodo(fastify, req, reply)
  );

  done();
};

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  deleteTodoQuery,
  getTodoQuery,
  getTodosQuery,
  insertTodoQuery,
  updateTodoQuery
} from './queries';
import { CreateRequest, ParamsIdRequest, Todo, UpdateRequest } from './types';

export async function createTodo(
  fastify: FastifyInstance,
  req: CreateRequest,
  reply: FastifyReply
) {
  const { todo } = req.body;

  const {
    rows: [result]
  } = await fastify.pg.query<{ todo: string; id: string }>(
    insertTodoQuery(todo)
  );

  return reply.send(result);
}

export async function updateTodo(
  fastify: FastifyInstance,
  req: UpdateRequest,
  reply: FastifyReply
) {
  const { id } = req.params;
  const { todo } = req.body;  

  const {
    rows: [result]
  } = await fastify.pg.query<Todo>(updateTodoQuery(id, todo));

  if (!result) return reply.notFound('Todo not found');

  return reply.send(result);
}

export async function deleteTodo(
  fastify: FastifyInstance,
  req: ParamsIdRequest,
  reply: FastifyReply
) {
  const { id } = req.params;

  const { rowCount } = await fastify.pg.query(deleteTodoQuery(id));

  if (rowCount === 0) return reply.notFound('Todo not found');

  return reply.status(204).send();
}

export async function getTodo(
  fastify: FastifyInstance,
  req: ParamsIdRequest,
  reply: FastifyReply
) {
  const { id } = req.params;

  const {
    rows: [result]
  } = await fastify.pg.query<Todo>(getTodoQuery(id));

  if (!result) return reply.notFound('Todo not found');

  return reply.send(result);
}

export async function getTodos(
  fastify: FastifyInstance,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { rows: result } = await fastify.pg.query<Todo>(getTodosQuery());

  return reply.send(result);
}

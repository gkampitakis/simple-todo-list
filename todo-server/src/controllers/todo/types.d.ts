import { FastifyRequest } from 'fastify';

export type CreateRequest = FastifyRequest<{ Body: { todo: string } }>;
export type UpdateRequest = FastifyRequest<{
  Params: { id: string };
  Body: { todo: string };
}>;
export type ParamsIdRequest = FastifyRequest<{ Params: { id: string } }>;
export type Todo = {
  id: string;
  todo: string;
  createdAt: string;
};

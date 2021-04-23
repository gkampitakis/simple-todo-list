import { FastifyError, FastifyInstance } from 'fastify';
import todoRoutes from './todo';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.register(todoRoutes, { prefix: '/todo' });

  done();
};
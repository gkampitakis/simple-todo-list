import { FastifySchema } from 'fastify';
import { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyInstance {
    isProduction: boolean;
    pg: Pool;
  }
}

export type Schema = FastifySchema & {
  summary?: string;
  description?: string;
};

import { FastifyError, FastifyInstance, FastifyRegisterOptions } from 'fastify';
import fp from 'fastify-plugin';
import pg from 'pg';

function postgres(
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void
) {
  const client = new pg.Pool({
    user: process.env.PG_USER || 'root',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'todo_db',
    password: process.env.PG_PASS || 'secret',
    port: parseInt(process.env.PG_PORT || '5432')
  });

  fastify.decorate('pg', client);
  fastify.addHook('onClose', async () => {
    await client.end();
  });

  done();
}

export default fp(postgres, {
  name: 'postgres'
});

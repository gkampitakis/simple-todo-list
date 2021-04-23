import ServerInstance from './server';
import { FastifyInstance } from 'fastify';

let server: FastifyInstance;

describe('Server', () => {
  beforeEach(() => {
    jest.resetModules();
    // process.env.NODE_ENV = 'test';
  });

  beforeAll(async () => {
    const { fastify } = new ServerInstance();
    await fastify.ready();
    server = fastify;
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    await server.pg.query('TRUNCATE todos');
  });

  it('Should create a todo', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/todo',
      payload: {
        todo: 'hello world'
      }
    });

    expect(JSON.parse(response.body)).toEqual({
      todo: 'hello world',
      id: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('Should retrieve a todo', async () => {
    const {
      rows: [result]
    } = await server.pg.query<{ id: string }>(
      `INSERT INTO todos (todo) VALUES ('test') RETURNING id`
    );

    const response = await server.inject({
      method: 'GET',
      url: `/todo/${result.id}`
    });

    expect(JSON.parse(response.body)).toEqual({
      todo: 'test',
      id: result.id,
      createdAt: expect.any(String)
    });
  });

  it('Should delete a todo', async () => {
    const {
      rows: [result]
    } = await server.pg.query<{ id: string }>(
      `INSERT INTO todos (todo) VALUES ('test') RETURNING id`
    );

    const response = await server.inject({
      method: 'DELETE',
      url: `/todo/${result.id}`
    });

    expect(response.body).toBe('');
    expect(response.statusCode).toBe(204);
  });

  it('Should update a todo', async () => {
    const {
      rows: [result]
    } = await server.pg.query<{ id: string }>(
      `INSERT INTO todos (todo) VALUES ('test') RETURNING id`
    );

    const response = await server.inject({
      method: 'PUT',
      url: `/todo/${result.id}`,
      payload: {
        todo: 'testV2'
      }
    });

    expect(JSON.parse(response.body)).toEqual({
      todo: 'testV2',
      id: result.id,
      createdAt: expect.any(String)
    });
  });

  it('Should return multiple todos', async () => {
    const { rows } = await server.pg.query<{ id: string }>(
      `INSERT INTO todos (todo) VALUES ('test'),('test2') RETURNING id`
    );

    const response = await server.inject({
      method: 'GET',
      url: '/todo/all'
    });

    expect(JSON.parse(response.body)).toEqual([
      {
        todo: 'test',
        id: rows[0].id,
        createdAt: expect.any(String)
      },
      {
        todo: 'test2',
        id: rows[1].id,
        createdAt: expect.any(String)
      }
    ]);
  });

  it('Should return 404 if todo not found', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/todo/8c841194-a12a-4743-91fe-089a0519966b'
    });

    expect(response.statusCode).toBe(404);
  });

  it('Should return 400 if id not uuid', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/todo/123132'
    });

    expect(response.statusCode).toBe(400);
  });
});

# Simple Todo List

A tutorial for creating a simple todo list.

## Contents

- Todo Client, React UI
- Todo Server, Fastify Server

Both components have some basic unit tests.

### Todo server

In order to run tests you ll need to have at least docker installed.

Todo Server uses `Postgres` as storage so you ll need an instance running for tests and for running locally.

```bash
# inside /todo-server

npm install # install dependencies

npm run setup:integration # Creates a postgres with correct configuration

npm run run:integration # Run tests

npm run teardown:integration # Shutdown postgres instance
```

### UI client

```bash
# inside /todo-client
npm install # install dependencies

npm run test
```

# Running locally

You can run both `Postgres` and `todo-server` containerized and UI will be connected to them by running inside `/todo-server` 

```bash
docker-compose up -d
```

and then inside `todo-client` you can start react-app by running 

```bash
npm run start
```
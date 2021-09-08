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

yarn run setup:integration # Creates a postgres with correct configuration

yarn run run:integration # Run tests

yarn run teardown:integration # Shutdown postgres instance
```

### UI client

```bash
yarn

yarn test
```

# Running locally

You can run both `Postgres` and `todo-server` containerized and UI will be connected to them by running inside `/todo-server` 

```bash
docker-compose up -d
```

and then inside `todo-client` you can start react-app by running 

```bash
yarn start
```
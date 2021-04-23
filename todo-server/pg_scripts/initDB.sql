CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS todos (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  todo VARCHAR NOT NULL,
  createdAt TIMESTAMP default current_timestamp
);

CREATE UNIQUE INDEX job_index ON JOBS (id);
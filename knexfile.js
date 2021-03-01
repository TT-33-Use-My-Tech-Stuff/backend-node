require('dotenv').config();

const pgConnection =
  process.env.DATABASE_URL ||
  'postgresql://postgres@localhost/auth';
// if using a local postgres server, please create the database manually, Knex will not create it autmatically

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  pool: {
    afterCreate: (conn, done) =>
      conn.run('PRAGMA foreign_keys = ON', done)
  }
};

module.exports = {
  development: {
    ...sharedConfig,
    seeds: { directory: './data/seeds' },
    connection: {
      filename: './data/users.db3'
    }
  },
  testing: {
    ...sharedConfig,
    connection: {
      filename: './data/test.db3'
    }
  },
  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};

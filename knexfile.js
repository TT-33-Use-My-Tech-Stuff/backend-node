require('dotenv').config();
const pg = require('pg');

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

const sharedConfig = {
  client: 'pg',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' }
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 }
  }
};
// module.exports = async () => {
//   return {
//     development: {
//       ...sharedConfig,
//       connection: process.env.DEV_DATABASE_URL
//     },
//     testing: {
//       ...sharedConfig,
//       connection: process.env.TESTING_DATABASE_URL
//     },
//     production: {
//       ...sharedConfig,
//       connection: process.env.DATABASE_URL,
//       pool: { min: 2, max: 10 }
//     }
//   };
// };

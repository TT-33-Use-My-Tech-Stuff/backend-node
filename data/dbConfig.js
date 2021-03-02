const knex = require('knex');

const knexfile = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexfile[environment]);


//*Ruben's code for his knexfile
// const knex = require('knex');
// const configs = require('../knexfile');
// module.exports = knex(configs[process.env.NODE_ENV]);

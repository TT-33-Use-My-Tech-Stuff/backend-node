const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./users/users-router');
const techRouter = require('./tech/tech-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/api/users', usersRouter);
server.use('/api/tech', techRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up & running' });
});

module.exports = server;

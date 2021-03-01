const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret');
const Users = require('../users/users-model');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json('No token');
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json('The token is bad, ' + err.message);
      } else {
        //this is how we will have access to the token info
        req.decodedToken = decoded;
        next();
      }
    });
  }
};

const checkPayload = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json('username and password required');
  } else {
    next();
  }
};

const checkUserInDb = async (req, res, next) => {
  try {
    const rows = await Users.findBy({
      username: req.body.username
    });
    if (!rows.length) {
      next();
    } else {
      res.status(401).json('username taken');
    }
  } catch (err) {
    res.status(500).json(`Server error: ${err}`);
  }
};

const checkUserExists = async (req, res, next) => {
  try {
    const rows = await Users.findBy({
      username: req.body.username
    });
    if (rows.length) {
      req.userData = rows[0];
      next();
    } else {
      res.status(401).json('invalid credentials');
    }
  } catch (error) {
    res.status(500).json('username and password required');
  }
};

module.exports = {
  restricted,
  checkPayload,
  checkUserInDb,
  checkUserExists
};

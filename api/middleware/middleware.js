const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret');
const Users = require('../users/users-model');
const Tech = require('../tech/tech-model');

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
    res.status(401).json('Username and password required');
  } else {
    next();
  }
};

const checkTechPayload = (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(401)
      .json('Name and description of tech required');
  } else {
    next();
  }
};

const checkEditTechPayload = (req, res, next) => {
  if (
    req.body.name ||
    req.body.decription ||
    req.body.tech_img
  ) {
    next();
  } else {
    res
      .status(401)
      .json(
        'New tech name, description or image is required'
      );
  }
};

const checkEditUserPayload = (req, res, next) => {
  if (
    req.body.username ||
    req.body.email ||
    req.body.ava_img ||
    req.body.role_id
  ) {
    next();
  } else {
    res
      .status(401)
      .json(
        'New user name, description, avatar or role is required'
      );
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
    res.status(400).json('username and password required');
  }
};

//Check if the user has the role of Owner or Renter
const checkIfOwner = async (req, res, next) => {
  try {
    const user = await Users.findById(req.body.user_id);
    if (user.role_id === 2) {
      next();
    } else {
      res
        .status(401)
        .json(
          'You must be an owner to have permission to do that'
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Check if the person editing the tech is the actuall owner of the tech
const checkIfOwnerOfTech = async (req, res, next) => {
  const { user_id } = req.body;
  console.log(user_id);
  const tech_id = req.params.id;
  console.log(tech_id);
  try {
    Tech.findById(tech_id).then((tech) => {
      if (tech.user_id === user_id) {
        next();
      } else {
        res
          .status(401)
          .json(
            'You must be an owner to have permission to do that'
          );
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  restricted,
  checkPayload,
  checkEditUserPayload,
  checkTechPayload,
  checkEditTechPayload,
  checkUserInDb,
  checkUserExists,
  checkIfOwner,
  checkIfOwnerOfTech
};

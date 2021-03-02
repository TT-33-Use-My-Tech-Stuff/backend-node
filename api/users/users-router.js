const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret.js');
const Users = require('./users-model.js');

const {
  restricted,
  checkPayload,
  checkUserInDb,
  checkUserExists
} = require('../middleware/middleware');

//Allows someone with a valid token to look at a list of all users
router.get('/', restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post(
  '/register',
  checkPayload,
  checkUserInDb,
  async (req, res) => {
    const rounds = process.env.BCRYPT_ROUNDS || 10;
    //this ⬆ uses 10 for now but can use a hidden amount of rounds in the env file
    try {
      const hash = bcrypt.hashSync(
        req.body.password,
        rounds
      );
      const newUser = await Users.add({
        username: req.body.username,
        password: hash
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post('/login', checkUserExists, (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username: username })
    .then(([user]) => {
      if (
        user &&
        bcrypt.compareSync(password, user.password)
      ) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome, ${user.username}`,
          token
        });
      } else {
        res
          .status(401)
          .json({ message: 'Invalid credentials' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json('username and password required');
    });

  // try {
  //   user &&
  //   bcrypt.compareSync(password, user.password)
  //     .then(() => {

  //       const token = generateToken(user);
  //         res.status(200).json({
  //           message: `Welcome, ${user.username}`,
  //           token
  //         });
  //     }

  //   )
  // } catch (error) {
  //   res
  //       .status(401)
  //       .json({ message: 'Invalid credentials' });
  // }

  // try {(user) => {

  //   if (
  //     user &&
  //     bcrypt.compareSync(password, user.password)
  //   ) {
  //     const token = generateToken(user);
  //     res.status(200).json({
  //       message: `Welcome, ${user.username}`,
  //       token
  //     });
  //   } else {
  //     res
  //       .status(401)
  //       .json({ message: 'Invalid credentials' });
  //   }
  // }
  // } catch (error) {
  //   res
  //       .status(500)
  //       .json('username and password required');
  // }

  // Users.findBy({ username: username })
  //   .then(([user]) => {
  //     if (
  //       user &&
  //       bcrypt.compareSync(password, user.password)
  //     ) {
  //       const token = generateToken(user);
  //       res.status(200).json({
  //         message: `Welcome, ${user.username}`,
  //         token
  //       });
  //     } else {
  //       res
  //         .status(401)
  //         .json({ message: 'Invalid credentials' });
  //     }
  //   })
  //   .catch(() => {
  //     res
  //       .status(500)
  //       .json('username and password required');
  //   });
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '3h'
  };
  return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;

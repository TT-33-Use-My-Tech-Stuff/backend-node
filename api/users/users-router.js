const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model.js');
const { restricted, isValid } = require('./middleware');
const { jwtSecret } = require('../../config/secrets.js');

router.get('/users', restricted, (req, res) => {})


router.post(
  '/register',
  checkPayload,
  checkUserInDb,
  async (req, res) => {
    try {
      const hash = bcryptjs.hashSync(req.body.password, 10);
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
        bcryptjs.compareSync(password, user.password)
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
      res.status(500).json('username and password required');
    });
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

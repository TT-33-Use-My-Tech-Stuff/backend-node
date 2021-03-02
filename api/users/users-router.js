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

// router.get('/:id', restricted, (req, res) => {
//   const {id} = req.params

//   Users.findById(id)
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });



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


// router.delete('/:id', (req, res) => {
//   const { id } = req.params;

//   Users.remove(id)
//     .then((deleted) => {
//       if (deleted) {
//         res.json({ message: 'User successfully removed' });
//       } else {
//         res.status(404).json({
//           message: 'Could not find user with given id'
//         });
//       }
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: 'Failed to delete user' });
//     });
// });

// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   Users.findById(id)
//     .then((user) => {
//       if (user) {
//         return Users.update(id, changes);
//       } else {
//         res.status(404).json({
//           message: 'Could not find user with given id'
//         });
//       }
//     })
//     .then((updateduser) => {
//       res.json(updateduser);
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: 'Failed to update user' });
//     });
// });


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

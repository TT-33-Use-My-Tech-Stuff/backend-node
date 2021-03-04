const router = require('express').Router();
const {
  restricted,
  checkTechPayload,
  checkEditTechPayload,
  checkIfOwner,
  checkIfOwnerOfTech
} = require('../middleware/middleware');
const Tech = require('./tech-model');

router.get('/', restricted, (req, res) => {
  Tech.find()
    .then((tech) => {
      res.status(200).json(tech);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Tech.findById(id)
    .then((tech) => {
      res.status(200).json(tech);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post(
  '/',
  restricted,
  checkTechPayload,
  checkIfOwner,
  async (req, res) => {
    try {
      const newTech = await Tech.add({
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.user_id
      });
      res.status(201).json(newTech);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.put(
  '/:id',
  restricted,
  checkEditTechPayload,
  checkIfOwnerOfTech,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Tech.findById(id)
      .then((tech) => {
        if (tech) {
          return Tech.update(id, changes);
        } else {
          res.status(404).json({
            message: 'Could not find tech with given id'
          });
        }
      })
      .then((updatedTech) => {
        res.json(updatedTech);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: 'Failed to update tech' });
      });
  }
);

router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Tech.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ message: 'Tech successfully removed' });
      } else {
        res.status(404).json({
          message: 'Could not find tech with given id'
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Failed to delete tech' });
    });
});

module.exports = router;

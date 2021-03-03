const router = require('express').Router();
const { restricted } = require('../middleware/middleware');
const Tech = require('./tech-model')


router.get('/', restricted, (req, res) => {
  res.status(200).json(tech);
});

router.get('/:id', (req, res) => {

})
router.post('/', (req, res) => {})
router.put('/:id', (req, res) => {})
router.delete('/:id', (req, res) => {})

module.exports = router;

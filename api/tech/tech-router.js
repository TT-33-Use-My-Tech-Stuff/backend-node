const router = require('express').Router();
const { restricted } = require('../middleware/middleware');


router.get('/', restricted, (req, res) => {
  res.status(200).json(tech);
});

router

module.exports = router;

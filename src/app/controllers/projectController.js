const { Router } = require('express');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.status(200).send({ ok: true, user: req.userId });
});

module.exports = app => app.use('/projects', router);
const express = require('express');
const router = express.Router()

const playerController = require('../controllers/playerController');

router.get('/', playerController.index);
router.post('/create', playerController.create);

module.exports = router;